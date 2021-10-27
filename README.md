How to run it:

npm install
mongo issuetracker --eval "db.employees.remove({})"
node scripts/trymongo.js
mongo issuetracker scripts/init.mongo.js
npx babel src --presets @babel/react --out-dir public
npm start

GraphQL API:
Add:

mutation {
  Add(issue:{
		name:"Xinyue",
        phoneNumber:"123456"
  }) { 
    _id
    id
    serialNumber
    name
    phoneNumber
    created
} }

Read:

query { Read{
  _id
    id
  	serialNumber
    name
    phoneNumber
    created
} }

Delete:

mutation { Delete(issue:{
  	serialNumber:"000001",
}){
  _id
    id
    name
    phoneNumber
    created
}}


SerialNumber is a unique number for every guest. Starting from 000001, 000002... You can change the serial number to specify which one you want to delete.