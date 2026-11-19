<#
.SYNOPSIS
    Compile the agentic workflows, commit, push, and optionally tag - in one command.

.DESCRIPTION
    Runs `gh aw compile` FIRST and aborts if it fails, so a stale or invalid
    .lock.yml can never be pushed. Then stages, commits, pushes, and (if -Tag
    is given) creates and pushes the tag that triggers the release summary.

    Staging is deliberately conservative. By default only files already tracked
    by git are staged (git add -u); new files must be named with -Paths, or
    swept in with -All. Whatever is staged is printed and confirmed before the
    commit, unless -Yes is passed.

.PARAMETER Message
    Commit message. Required.

.PARAMETER Tag
    Version tag to create and push, e.g. v1.0.2. Omit to push without tagging.

.PARAMETER Paths
    Specific paths to stage. Use this when the working tree has unrelated
    work-in-progress you do not want committed.

.PARAMETER All
    Stage everything, including untracked files (git add -A). Use with care.

.PARAMETER Remote
    Git remote. Default: origin

.PARAMETER Branch
    Branch to push. Default: main

.PARAMETER DryRun
    Show what would happen. Stages nothing, commits nothing, pushes nothing.

.PARAMETER SkipTagPush
    Create the tag locally but do not push it. No workflow run is triggered.

.PARAMETER SkipCompile
    Skip `gh aw compile`. Only for repos with no agentic workflow.

.PARAMETER Yes
    Do not ask for confirmation before committing.

.EXAMPLE
    .\ship.ps1 -Message "fix hero spacing" -Paths app,components -Tag v1.0.2

.EXAMPLE
    .\ship.ps1 -Message "add CI workflow" -Paths .github,ship.ps1 -DryRun
#>
[CmdletBinding()]
param(
    [Parameter(Mandatory = $true)]
    [string]   $Message,

    [string]   $Tag,
    [string[]] $Paths,
    [switch]   $All,
    [string]   $Remote = "origin",
    [string]   $Branch = "main",
    [switch]   $DryRun,
    [switch]   $SkipTagPush,
    [switch]   $SkipCompile,
    [switch]   $Yes
)

$ErrorActionPreference = "Stop"

function Step  ($m) { Write-Host ""; Write-Host "==> $m" -ForegroundColor Cyan }
function Ok    ($m) { Write-Host "    $m"  -ForegroundColor Green }
function Warn  ($m) { Write-Host "    $m"  -ForegroundColor Yellow }

# --- Sanity: are we in a git repo? ---
Step "Checking repository"
$root = (git rev-parse --show-toplevel 2>$null)
if (-not $root) { throw "Not inside a git repository." }
Set-Location $root
Ok "Repo root: $root"

$current = (git rev-parse --abbrev-ref HEAD).Trim()
if ($current -ne $Branch) {
    Warn "You are on '$current' but -Branch is '$Branch'."
    if (-not $Yes) {
        $go = Read-Host "    Continue anyway? (y/N)"
        if ($go -ne "y") { throw "Aborted - branch mismatch." }
    }
}

# --- Compile the agentic workflow BEFORE anything is committed ---
if (-not $SkipCompile) {
    Step "Compiling agentic workflows (gh aw compile)"
    gh aw compile --approve
    if ($LASTEXITCODE -ne 0) {
        throw "gh aw compile FAILED (exit $LASTEXITCODE). Nothing was committed or pushed."
    }
    Ok "Compile succeeded"
} else {
    Warn "Skipping gh aw compile (-SkipCompile)"
}

# --- Stage ---
Step "Staging changes"
if ($All)            { $stageDesc = "git add -A (everything, including new files)" }
elseif ($Paths)      { $stageDesc = "git add -- $($Paths -join ' ')" }
else                 { $stageDesc = "git add -u (tracked files only)" }
Ok $stageDesc

if (-not $DryRun) {
    if     ($All)   { git add -A }
    elseif ($Paths) { git add -- @Paths }
    else            { git add -u }
}

# --- Show exactly what will be committed ---
Step "Files staged for commit"
if ($DryRun) {
    Warn "Dry run: nothing was staged, so there is nothing to list."
    Warn "Re-run without -DryRun to stage and see the real list."
} else {
    $staged = git diff --cached --name-only
    if (-not $staged) { throw "Nothing staged. Use -Paths or -All." }
    $staged | ForEach-Object { Write-Host "    $_" }
    Write-Host "    ---- $(($staged | Measure-Object).Count) file(s)" -ForegroundColor Gray

    if (-not $Yes) {
        $go = Read-Host "    Commit these? (y/N)"
        if ($go -ne "y") {
            git reset | Out-Null
            throw "Aborted - staged files have been unstaged."
        }
    }
}

if ($DryRun) {
    Step "Dry run summary"
    Ok "Would commit : $Message"
    Ok "Would push   : $Remote $Branch"
    if ($Tag) {
        if ($SkipTagPush) { Ok "Would tag    : $Tag (local only, no trigger)" }
        else              { Ok "Would tag    : $Tag and push it (TRIGGERS the release summary)" }
    } else {
        Ok "Would tag    : nothing"
    }
    Write-Host ""
    return
}

# --- Commit ---
Step "Committing"
git commit -m $Message
if ($LASTEXITCODE -ne 0) { throw "git commit failed." }
Ok "Committed"

# --- Push branch ---
Step "Pushing $Branch to $Remote"
git push $Remote $Branch
if ($LASTEXITCODE -ne 0) {
    Warn "git push failed. Your commit is safe locally."
    Warn "If the error mentions 'repository rule violations', branch protection"
    Warn "is on and main no longer accepts direct pushes. Move the work to a"
    Warn "branch and open a pull request:"
    Warn "    git switch -c my-change"
    Warn "    git push $Remote my-change"
    Warn "    gh pr create --base $Branch"
    throw "Push rejected."
}
Ok "Pushed"

# --- Tag ---
if ($Tag) {
    Step "Tagging $Tag"
    $exists = git tag -l $Tag
    if ($exists) { throw "Tag '$Tag' already exists. Pick a new version." }

    git tag $Tag
    Ok "Tag created locally"

    if ($SkipTagPush) {
        Warn "Not pushing the tag (-SkipTagPush). No release summary will run."
        Warn "Push it later with: git push $Remote $Tag"
    } else {
        git push $Remote $Tag
        if ($LASTEXITCODE -ne 0) { throw "Tag push failed. Retry: git push $Remote $Tag" }
        Ok "Tag pushed - the release summary workflow is now running"
        Write-Host ""
        Write-Host "    Watch it:  gh run watch" -ForegroundColor Gray
        Write-Host "    Or:        gh run list --limit 3" -ForegroundColor Gray
    }
}

Write-Host ""
Write-Host "Done." -ForegroundColor Green
Write-Host ""
