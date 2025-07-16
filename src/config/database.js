

export default{
    dialect: 'postgres',
    host:'localhost',
    port:5433,
    username:'postgres',
    password:'postgres',
    database:'devburger',
      
    define:{
      timeStamp:true,
      underscored:true,
      underscoredAll:true
    }
}