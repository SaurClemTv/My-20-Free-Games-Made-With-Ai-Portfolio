Add-Type -AssemblyName System.Drawing

function Key-And-Crop {
  param([string]$InPath, [string]$OutPath)
  if (-not (Test-Path $InPath)) { Write-Host "MISSING $InPath"; return }
  $srcBmp = [System.Drawing.Bitmap]::FromFile($InPath)
  $w = $srcBmp.Width; $h = $srcBmp.Height
  $rect = New-Object System.Drawing.Rectangle 0, 0, $w, $h
  $srcData = $srcBmp.LockBits($rect, [System.Drawing.Imaging.ImageLockMode]::ReadOnly, [System.Drawing.Imaging.PixelFormat]::Format32bppArgb)
  $bytes = $srcData.Stride * $h
  $buf = New-Object byte[] $bytes
  [Runtime.InteropServices.Marshal]::Copy($srcData.Scan0, $buf, 0, $bytes)
  $srcBmp.UnlockBits($srcData)
  $minX = $w; $minY = $h; $maxX = 0; $maxY = 0
  $stride = $srcData.Stride
  for ($y = 0; $y -lt $h; $y++) {
    $row = $y * $stride
    for ($x = 0; $x -lt $w; $x++) {
      $i = $row + $x * 4
      $b = [int]$buf[$i]; $g = [int]$buf[$i+1]; $r = [int]$buf[$i+2]
      $isMag = ($r -gt 155 -and $g -lt 150 -and $b -gt 70 -and ($r - $g) -gt 35)
      if ($isMag) { $buf[$i+3] = 0 } else {
        if ($x -lt $minX) { $minX = $x }
        if ($y -lt $minY) { $minY = $y }
        if ($x -gt $maxX) { $maxX = $x }
        if ($y -gt $maxY) { $maxY = $y }
      }
    }
  }
  if ($maxX -lt $minX) { $srcBmp.Dispose(); Write-Host "EMPTY $InPath"; return }
  $pad = 6
  $minX = [Math]::Max(0, $minX - $pad); $minY = [Math]::Max(0, $minY - $pad)
  $maxX = [Math]::Min($w-1, $maxX + $pad); $maxY = [Math]::Min($h-1, $maxY + $pad)
  $cw = $maxX - $minX + 1; $ch = $maxY - $minY + 1
  $full = New-Object System.Drawing.Bitmap $w, $h, ([System.Drawing.Imaging.PixelFormat]::Format32bppArgb)
  $fullData = $full.LockBits($rect, [System.Drawing.Imaging.ImageLockMode]::WriteOnly, [System.Drawing.Imaging.PixelFormat]::Format32bppArgb)
  [Runtime.InteropServices.Marshal]::Copy($buf, 0, $fullData.Scan0, $bytes)
  $full.UnlockBits($fullData)
  $crop = New-Object System.Drawing.Bitmap $cw, $ch, ([System.Drawing.Imaging.PixelFormat]::Format32bppArgb)
  $gfx = [System.Drawing.Graphics]::FromImage($crop)
  $gfx.CompositingMode = [System.Drawing.Drawing2D.CompositingMode]::SourceCopy
  $gfx.DrawImage($full, (New-Object System.Drawing.Rectangle 0,0,$cw,$ch), $minX, $minY, $cw, $ch, [System.Drawing.GraphicsUnit]::Pixel)
  $gfx.Dispose()
  $dir = Split-Path $OutPath -Parent
  if (-not (Test-Path $dir)) { New-Item -ItemType Directory -Path $dir | Out-Null }
  $crop.Save($OutPath, [System.Drawing.Imaging.ImageFormat]::Png)
  $crop.Dispose(); $full.Dispose(); $srcBmp.Dispose()
  Write-Host "OK $OutPath ($cw x $ch)"
}

$src = "C:\Users\justi\.grok\sessions\C%3A%5CUsers%5Cjusti\01a003f7-1535-7191-9ef4-e6d99ed11df1\images"
$props = "C:\Users\justi\Cozy-Platformer\assets\props"

$map = [ordered]@{
  "86.jpg" = "meadow-bush2.png"
  "87.jpg" = "meadow-tree3.png"
  "88.jpg" = "meadow-tree2.png"
  "89.jpg" = "meadow-flower2.png"
  "90.jpg" = "meadow-cloud1.png"
  "91.jpg" = "meadow-flower1.png"
  "92.jpg" = "brook-rock.png"
  "93.jpg" = "brook-reeds2.png"
  "94.jpg" = "brook-willow.png"
  "95.jpg" = "canopy-trunk.png"
  "96.jpg" = "canopy-mush.png"
  "97.jpg" = "canopy-vines2.png"
  "98.jpg" = "dune-bush.png"
  "99.jpg" = "dune-cactus.png"
  "100.jpg" = "dune-cactus2.png"
  "101.jpg" = "tide-shell.png"
  "102.jpg" = "tide-drift.png"
  "103.jpg" = "tide-kelp.png"
  "104.jpg" = "brook-lily.png"
  "105.jpg" = "dune-rock2.png"
  "106.jpg" = "meadow-cloud2.png"
  "107.jpg" = "canopy-leaf.png"
  "108.jpg" = "meadow-cloud3.png"
  "109.jpg" = "tide-rock2.png"
}

foreach ($k in $map.Keys) {
  Key-And-Crop (Join-Path $src $k) (Join-Path $props $map[$k])
}

# brook cloud reuses a meadow cloud
Copy-Item (Join-Path $props "meadow-cloud2.png") (Join-Path $props "brook-cloud1.png") -Force
Write-Host "DONE"
