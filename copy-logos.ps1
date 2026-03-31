$src = "C:\Users\ٍSalahKhaled\.gemini\antigravity\brain\200b4db1-4fed-46f5-947e-0eec91a45646"
$dst = "d:\2147_titan_folio\public\logos"

Copy-Item "$src\logo_darak_1774907957755.png"         "$dst\logo-darak.png"
Copy-Item "$src\logo_infinity_portal_1774907970510.png" "$dst\logo-infinity-portal.png"
Copy-Item "$src\logo_tadawul_1774907984083.png"        "$dst\logo-tadawul.png"
Copy-Item "$src\logo_build_hub_1774907996778.png"      "$dst\logo-build-hub.png"
Copy-Item "$src\logo_infinity_bright_1774908010753.png" "$dst\logo-infinity-bright.png"
Copy-Item "$src\logo_rentals_1774908027437.png"        "$dst\logo-rentals.png"

Write-Host "✅ Done! Files copied:"
Get-ChildItem $dst | Select-Object Name
