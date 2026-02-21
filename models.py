class Expense:
    """Module IV & V: Class with Instance Attributes"""
    def __init__(self, title, amount, category):
        self.title = title
        self.amount = amount
        self.category = category

    def get_details(self):
        """Module VII: Method that can be overridden (Polymorphism)"""
        return f"{self.title} | ${self.amount:.2f} | Category: {self.category}"

class Subscription(Expense): 
    """Module VI: Inheritance (Superclass and Subclass)"""
    def __init__(self, title, amount, category, cycle="Monthly"):
        # Module VI: Super() relationship
        super().__init__(title, amount, category)
        self.cycle = cycle

    def get_details(self):
        """Module VII: Method Overriding"""
        return f"[SUB] {self.title} | ${self.amount:.2f}/{self.cycle}"