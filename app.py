from models import Expense, Subscription
import logic

def main():
    BUDGET_LIMIT = 1000.0  # Module VIII: Logical boundary
    
    while True:
        total = logic.get_total_spent()
        print("\n" + "="*30)
        print(f" SMART SPEND AI | TOTAL: ${total:.2f}")
        print("="*30)
        
        # Module VIII: Logical Alert (Exception-style handling)
        if total > BUDGET_LIMIT:
            print(" WARNING: You have exceeded your budget limit!")

        print("1. Add One-time Expense")
        print("2. Add Recurring Subscription")
        print("3. View All Expenses")
        print("4. Delete an Expense")
        print("5. Exit")
        
        choice = input("\nSelect an option: ")

        try: # Module VIII: Exception Handling (TypeError/ValueError)
            if choice == "1":
                name = input("Item name: ")
                price = float(input("Price: "))
                cat = input("Category: ")
                new_exp = Expense(name, price, cat)
                logic.save_to_file(new_exp)
                print(" Expense Saved!")

            elif choice == "2":
                name = input("Subscription name: ")
                price = float(input("Monthly price: "))
                cat = input("Category: ")
                cycle = input("Cycle (Monthly/Yearly): ")
                new_sub = Subscription(name, price, cat, cycle)
                logic.save_to_file(new_sub)
                print(" Subscription Saved!")

            elif choice == "3":
                items = logic.read_all()
                print("\n--- FINANCIAL REPORT ---")
                for i in items:
                    print(f"- {i['name']}: ${i['price']} [{i['category']}]")
            
            elif choice == "4":
                name = input("Enter item name to delete: ")
                if logic.delete_expense(name):
                    print(f" Deleted {name}.")
                else:
                    print(" Item not found.")

            elif choice == "5":
                print("Exiting... Have a great day!")
                break
            
            else:
                print("Invalid choice, try again.")

        except ValueError:
            print(" Error: Please enter a valid number for the price.")
        except Exception as e:
            print(f"An unexpected error occurred: {e}")

if __name__ == "__main__":
    main()