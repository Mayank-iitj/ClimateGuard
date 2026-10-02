import csv
import random

cities = ["Mumbai", "Delhi", "Bangalore", "Hyderabad", "Ahmedabad", "Chennai", "Kolkata", "Surat", "Pune", "Jaipur", "Lucknow", "Kanpur", "Nagpur", "Indore", "Thane", "Bhopal", "Visakhapatnam", "Patna", "Vadodara", "Ghaziabad"]
states = ["MH", "DL", "KA", "TG", "GJ", "TN", "WB", "GJ", "MH", "RJ", "UP", "UP", "MH", "MP", "MH", "MP", "AP", "BR", "GJ", "UP"]
industries = ["Manufacturing", "Textiles", "IT/ITeS", "Food Processing", "Chemicals", "Logistics", "Retail", "Automotive", "Pharmaceuticals", "Agriculture"]
backups = ["Diesel Genset", "Solar + Battery", "Grid Only", "UPS Backup", "Gas Generator"]

with open('sample_assets_100.csv', 'w', newline='', encoding='utf-8') as f:
    writer = csv.writer(f)
    writer.writerow(["Facility_Name", "Industry_Type", "City", "State", "Annual_Revenue", "Monthly_Electricity_Cost", "Backup_Power_Type"])
    for i in range(1, 101):
        city_idx = random.randint(0, len(cities)-1)
        city = cities[city_idx]
        state = states[city_idx]
        ind = random.choice(industries)
        rev = random.randint(500000, 50000000)
        elec = random.randint(5000, 250000)
        backup = random.choice(backups)
        writer.writerow([f"{city} {ind} Hub {i}", ind, city, state, rev, elec, backup])

print("CSV generated successfully!")
