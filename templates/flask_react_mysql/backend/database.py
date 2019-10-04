import mysql.connector as connector

# docker run --rm --name webapp_database -d -p 3306:3306 -e MYSQL_ROOT_PASSWORD=password mysql --default-authentication-plugin=mysql_native_password
connection = connector.connect(
    host='localhost',
    port=3306,
    user='root',
    password='password'
)
cursor = connection.cursor()


def test():
    databases = ("show databases")
    cursor.execute(databases)
    li = []
    for (databases) in cursor:
         li.append(databases[0])


if __name__ == "__main__":
    print("Successfully connected to mysql")
