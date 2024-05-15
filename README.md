This is my first typescript server.
It has been a  amazing experience devloping with typescript :) 
To run the server do the following
1) npm install
2) npm start
Your server will be up and running if any doubt or error feel free to reach out to me
LinkedIn- https://www.linkedin.com/in/akshat-malik-258805235/
 
 I am using a json web token based authentication to authentcate users
 will start using open id connect 
 Create a .env file with the following values
 databaseUsername=""
databaseUserpassword=""
secret='shhhh'
githubSecret=''
githubSecretTwo=''
One everthing is setup the backedn databse name is friends 
The friends have 2 tables 
+-------------------+
| Tables_in_friends |
+-------------------+
| list              |
| users             |
+-------------------+
And here is what each table looks like :
MariaDB [friends]> DESCRIBE list;



+-------+--------------+------+-----+---------+-------+
| Field | Type         | Null | Key | Default | Extra |
+-------+--------------+------+-----+---------+-------+
| id    | varchar(200) | NO   | PRI | NULL    |       |
| name  | varchar(100) | NO   | PRI | NULL    |       |
| place | varchar(100) | NO   | PRI | NULL    |       |
+-------+--------------+------+-----+---------+-------+

And the second one is 
MariaDB [friends]> DESCRIBE users;
+----------+--------------+------+-----+---------+-------+
| Field    | Type         | Null | Key | Default | Extra |
+----------+--------------+------+-----+---------+-------+
| id       | varchar(200) | NO   | PRI | NULL    |       |
| password | text         | NO   |     | NULL    |       |
+----------+--------------+------+-----+---------+-------+

users have a foreign key to list table id column you can create that by using :-ALTER TABLE users ADD FOREIGN KEY (id) REFERENCES list(id);
