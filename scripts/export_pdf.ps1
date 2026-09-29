$ppt = New-Object -ComObject PowerPoint.Application
$pres = $ppt.Presentations.Open("D:\poj\mariadb-admin\myslides\slides.pptx", [Microsoft.Office.Core.MsoTriState]::msoTrue, [Microsoft.Office.Core.MsoTriState]::msoFalse, [Microsoft.Office.Core.MsoTriState]::msoFalse)
$pres.SaveAs("D:\poj\mariadb-admin\myslides\slides.pdf", 32)
$pres.Close()
$ppt.Quit()
[System.Runtime.Interopservices.Marshal]::ReleaseComObject($ppt) | Out-Null
Write-Host "Successfully exported D:\poj\mariadb-admin\myslides\slides.pdf"
