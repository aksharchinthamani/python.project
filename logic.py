import os

# Module I: Using a Set for unique categories
categories_set = {"Food", "Rent", "Transport", "Entertainment", "Utilities"}

def save_to_file(expense):
    """Module IX: Appending data to a text file."""
    with open("expenses.txt", "a") as f:
        f.write(f"{expense.title},{expense.amount},{expense.category}\n")

def read_all():
    """Module II & IX: Loading data into a List of Dictionaries."""
    data = []
    if not os.path.exists("expenses.txt"): 
        return []
    
    with open("expenses.txt", "r") as f:
        for line in f:
            parts = line.strip().split(",")
            if len(parts) == 3:
                # Module II: Storing data in a Dictionary (Key-Value pairs)
                data.append({
                    "name": parts[0], 
                    "price": float(parts[1]), 
                    "category": parts[2]
                })
    return data

def get_total_spent():
    """Module III: Performing operations on a List/Matrix."""
    data = read_all()
    # Simple list processing to calculate sum
    return sum(item['price'] for item in data)

def delete_expense(name_to_delete):
    """Module II & IX: Delete operations from the file database."""
    data = read_all()
    # Filtering the list (Short-hand expression / list creation with conditions)
    new_data = [item for item in data if item['name'].lower() != name_to_delete.lower()]
    
    # Module IX: Writing (Overwrite mode 'w') to reflect deletion
    with open("expenses.txt", "w") as f:
        for item in new_data:
            f.write(f"{item['name']},{item['price']},{item['category']}\n")
    
    return len(data) != len(new_data)