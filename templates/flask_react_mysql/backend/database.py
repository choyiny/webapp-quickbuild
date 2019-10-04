import mysql.connector as connector


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
