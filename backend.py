
import mysql.connector
import json
import time

# Database connection configuration
db_config = {
    'host': 'localhost',
    'user': 'root',
    'password': '12111',
    'database': 'datakgt'
}

def fetch_and_write_orders(cursor):
    query = "SELECT course_name AS productName, course_number AS productNumber, payment AS paymentStatus, status FROM orders"
    cursor.execute(query)
    rows = cursor.fetchall()

    orders = []
    for row in rows:
        order = {
            'productName': row[0],
            'productNumber': row[1],
            'paymentStatus': str(row[2]),  # Convert decimal to string for JSON
            'status': row[3]
        }
        orders.append(order)

    with open('orders.js', 'w') as js_file:
        js_file.write('const Orders = ')
        js_file.write(json.dumps(orders, indent=4))
        js_file.write(';\n')

    print("Orders data has been written to orders.js")

def fetch_and_write_users(cursor):
    query = "SELECT profile_image, name, last_active FROM users ORDER BY last_active DESC LIMIT 3"
    cursor.execute(query)
    rows = cursor.fetchall()

    users = []
    for row in rows:
        user = {
            'imgSrc': row[0],
            'name': row[1],
            'time': row[2].strftime('%Y-%m-%d %H:%M:%S')  # Convert datetime to string
        }
        users.append(user)

    with open('new_users.js', 'w') as js_file:
        js_file.write('const users = ')
        js_file.write(json.dumps(users, indent=4))
        js_file.write(';\n')

    print("New users data has been written to new_users.js")

def fetch_and_write_analytics(cursor):
    query = "SELECT metric_name, value, percentage_change FROM analytics"
    cursor.execute(query)
    rows = cursor.fetchall()

    analytics_data = {}
    for row in rows:
        metric_name = row[0]
        value = f"{row[1]:,}"  # Format value with commas as thousands separators
        percentage_change = f"{row[2]:+,.2f}%"  # Format percentage with sign and percentage symbol
        if metric_name == 'Total Sales':
            analytics_data['totalSales'] = f"${value}"  # Add $ sign to total sales
            analytics_data['totalSalesPercentage'] = percentage_change
        elif metric_name == 'Website Visits':
            analytics_data['siteVisits'] = value
            analytics_data['siteVisitsPercentage'] = percentage_change
        elif metric_name == 'Search Queries':
            analytics_data['searches'] = value
            analytics_data['searchesPercentage'] = percentage_change

    with open('analyticsd.js', 'w') as js_file:
        js_file.write(f"const totalSales = '{analytics_data.get('totalSales', '')}';\n")
        js_file.write(f"const totalSalesPercentage = '{analytics_data.get('totalSalesPercentage', '')}';\n")
        js_file.write(f"const siteVisits = '{analytics_data.get('siteVisits', '')}';\n")
        js_file.write(f"const siteVisitsPercentage = '{analytics_data.get('siteVisitsPercentage', '')}';\n")
        js_file.write(f"const searches = '{analytics_data.get('searches', '')}';\n")
        js_file.write(f"const searchesPercentage = '{analytics_data.get('searchesPercentage', '')}';\n")

    print("Analytics data has been written to analytics.js")

def fetch_and_write_uskamlt(cursor):
    query = "SELECT user_id, profile_image, name, last_active FROM users"
    cursor.execute(query)
    rows = cursor.fetchall()

    users = []
    for row in rows:
        user = {
            'userID': row[0],  # Include user_id in the output
            'imgSrc': row[1],
            'name': row[2],
            'time': row[3].strftime('%Y-%m-%d %H:%M:%S')  # Convert datetime to string
        }
        users.append(user)

    with open('uskamlt.js', 'w') as js_file:
        js_file.write('const users = ')
        js_file.write(json.dumps(users, indent=4))
        js_file.write(';\n')

    print(f"Fetched {len(users)} users.")





#login

def authenticate(username, password):
    conn = mysql.connector.connect(**db_config)
    cursor = conn.cursor(dictionary=True)
    query = "SELECT * FROM admins WHERE username = %s AND password = %s"
    cursor.execute(query, (username, password))
    user = cursor.fetchone()
    cursor.close()
    conn.close()
    return user

def fetch_and_write_profile_data(username):
    conn = mysql.connector.connect(**db_config)
    cursor = conn.cursor(dictionary=True)
    query = "SELECT username, profile_image FROM admins WHERE username = %s"
    cursor.execute(query, (username,))
    user = cursor.fetchone()
    
    if user:
        profile_data = {
            'username': user['username'],
            'profilePhoto': user['profile_image']
        }
        with open('profileData.js', 'w') as js_file:
            js_file.write('const profileData = ')
            js_file.write(json.dumps(profile_data, indent=4))
            js_file.write(';\n')
        print("Profile data has been written to profileData.js")
    else:
        print("User not found.")

#login end



def main():

    #login
    username = input("Enter username: ")
    password = input("Enter password: ")
    
    user = authenticate(username, password)
    if user:
        print("Login successful.")
        fetch_and_write_profile_data(username)
    else:
        print("Invalid username or password.")


         #login end

    while True:
        # Connect to the database
        db = mysql.connector.connect(**db_config)
        cursor = db.cursor()

        # Fetch and write data
        fetch_and_write_orders(cursor)
        fetch_and_write_users(cursor)
        fetch_and_write_analytics(cursor)
        fetch_and_write_uskamlt(cursor)  # Call the new function to fetch and write user data

        # Close the database connection
        cursor.close()
        db.close()

        # Wait before next update
        time.sleep(60)  # Sleep for 60 seconds

if __name__ == '__main__':
    main()