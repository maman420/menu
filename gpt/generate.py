import random
import json

menu = ["Classic Burger", "Bacon Cheeseburger", "Mushroom Swiss Burger", "BBQ Burger", "Double Cheeseburger", "Veggie Burger", "Bison Burger", "Margherita", "Pepperoni", "Meat Lovers", "Veggie", "Hawaiian", "BBQ Chicken", "White Pizza", "Buffalo Chicken", "Mushroom", "Supreme"]
n_pairs = 400

pairs = []

for i in range(n_pairs):
    num_items = random.randint(1, 3)
    menu_items = random.sample(menu, num_items)
    menu_items_str = ", ".join(menu_items)
    prompt_item = random.choice(menu_items)
    prompt = f"Give me 3 things from the menu that customers looking at {menu_items_str} would like, but not {menu_items[-1]}. -->"
    completion_items = random.sample(menu, 3)
    
    while any(item in completion_items for item in menu_items):
        for i, item in enumerate(completion_items):
            if item in menu_items:
                new_item = random.choice(menu)
                while new_item in completion_items:
                    new_item = random.choice(menu)
                completion_items[i] = new_item

    if len(completion_items) > 0:
        completion_str = ", ".join(completion_items)
        completion = f" {completion_str}. ###"
    else:
        completion = "I'm sorry, I couldn't find any recommendations. ###"
    pairs.append({"prompt": prompt, "completion": completion})

with open("prompt_completion_pairs.json", "w") as f:
    json.dump(pairs, f)