jbjkkbjhkbjThis is my first typescript server.
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
![crud-backend](https://github.com/Msuf123/crud-angular-app-backend/assets/88485149/1cf54307-404a-47bd-acad-0454558a1ade)


users have a foreign key to list table id column you can create that by using :-ALTER TABLE users ADD FOREIGN KEY (id) REFERENCES list(id);
