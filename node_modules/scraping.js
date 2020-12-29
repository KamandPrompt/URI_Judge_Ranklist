const axios = require('axios');
const request = require('request');
const fetch = require('isomorphic-fetch');
const cheerio = require('cheerio');
const xlsxFile = require('read-excel-file/node'); 

var URIdata = [
    ["27/12/2020 11:34:42","b20328@students.iitmandi.ac.in","Yuvraj Aseri","https://www.urionlinejudge.com.br/judge/en/profile/506744","B20328","Mechanical"],
    ["27/12/2020 11:39:55","b20318@students.iitmandi.ac.in","Shashwat Gupta","https://www.urionlinejudge.com.br/judge/en/profile/506734","B20318","Mechanical"],
    ["27/12/2020 11:40:16","b20195@students.iitmandi.ac.in","Snigdha","https://www.urionlinejudge.com.br/judge/en/profile/508275","B20195","Electrical"],
    ["27/12/2020 18:52:21","b20317@students.iitmandi.ac.in","B20317 Sarthak Jha","https://www.urionlinejudge.com.br/judge/en/profile/498115","B20317","Mechanical"],
    ["27/12/2020 11:45:48","b20245@students.iitmandi.ac.in","Arkadeep Ghosh","https://www.urionlinejudge.com.br/judge/en/profile/508224","B20245","EngineeringPhysics"],
    ["27/12/2020 11:56:16","b20186@students.iitmandi.ac.in","Aryan Apte","https://www.urionlinejudge.com.br/judge/en/profile/496186","B20186","Electrical"],
    ["27/12/2020 12:03:21","b20208@students.iitmandi.ac.in","Khushboo","https://www.urionlinejudge.com.br/judge/en/profile/508227","B20208","Electrical"],
    ["27/12/2020 12:11:41","b20139@students.iitmandi.ac.in","spilled_coffee","https://www.urionlinejudge.com.br/judge/en/profile/506559","B20139","ComputerScience"],
    ["27/12/2020 13:10:34","b20175@students.iitmandi.ac.in","AAYUSHMAAN JHA","https://www.urionlinejudge.com.br/judge/en/profile/506536","B20175","Electrical"],
    ["27/12/2020 13:21:31","b20170@students.iitmandi.ac.in","sourav447","https://www.urionlinejudge.com.br/judge/en/profile/506584","B20170","Data Science"],
    ["27/12/2020 13:40:28","b20234@students.iitmandi.ac.in","Sweety Agarwal","https://www.urionlinejudge.com.br/judge/en/profile/508789","B20234","Electrical"],
    ["27/12/2020 13:49:52","b20215@students.iitmandi.ac.in","Mohit Verma","https://www.urionlinejudge.com.br/judge/en/profile/508298","B20215","Electrical"],
    ["27/12/2020 14:07:30","b20144@students.iitmandi.ac.in","Abhay","https://www.urionlinejudge.com.br/judge/en/profile/508095","B20144","Data Science"],
    ["27/12/2020 14:16:07","b20150@students.iitmandi.ac.in","Awantika Deora","https://www.urionlinejudge.com.br/judge/en/profile/508090","B20150","Data Science"],
    ["27/12/2020 14:24:25","b20159@students.iitmandi.ac.in","Palak sharma","https://www.urionlinejudge.com.br/judge/en/profile/508106","B20159","Data Science"],
    ["27/12/2020 14:36:55","b20239@students.iitmandi.ac.in","Vishal Sharma","https://www.urionlinejudge.com.br/judge/en/profile/508160","B20239","Electrical"],
    ["27/12/2020 15:07:26","b20249@students.iitmandi.ac.in","Khushi Baghel","https://www.urionlinejudge.com.br/judge/en/profile/506711","B20249","EngineeringPhysics"],
    ["27/12/2020 15:14:32","b20100@students.iitmandi.ac.in","gokul goyal","https://www.urionlinejudge.com.br/judge/en/profile/508281","B20100","ComputerScience"],
    ["27/12/2020 15:20:36","b20063@students.iitmandi.ac.in","Rishabh Maheshwari","https://www.urionlinejudge.com.br/judge/en/profile/506703","B20063","Civil"],
    ["27/12/2020 15:53:43","b20113@students.iitmandi.ac.in","B20113 LAVISH SACHDEVA","https://www.urionlinejudge.com.br/judge/en/profile/508133","B20113","ComputerScience"],
    ["27/12/2020 15:53:57","b20122@students.iitmandi.ac.in","Pushpendra Kumar","https://www.urionlinejudge.com.br/judge/en/profile/506435","B20122","ComputerScience"],
    ["27/12/2020 15:54:43","b20151@students.iitmandi.ac.in","Ayush Kumar Agrawal","https://www.urionlinejudge.com.br/judge/en/profile/506549","B20151","Data Science"],
    ["27/12/2020 15:57:08","b20096@students.iitmandi.ac.in","Dipesh Sharma","https://www.urionlinejudge.com.br/judge/en/profile/508089","B20096","ComputerScience"],
    ["27/12/2020 16:02:15","b20163@students.iitmandi.ac.in","B20163 PIYUSH VERMA","https://www.urionlinejudge.com.br/judge/en/profile/508701","B20163","Data Science"],
    ["27/12/2020 16:09:16","b20134@students.iitmandi.ac.in","Shivam kumar","https://www.urionlinejudge.com.br/judge/en/profile/508800","B20134","ComputerScience"],
    ["27/12/2020 16:26:30","b20209@students.iitmandi.ac.in","Om Kshatriya","https://www.urionlinejudge.com.br/judge/en/profile/508260","B20209","Electrical"],
    ["27/12/2020 16:30:38","b20241@students.iitmandi.ac.in","Yash","https://www.urionlinejudge.com.br/judge/en/profile/508126","B20241","Electrical"],
    ["27/12/2020 16:37:29","b20236@students.iitmandi.ac.in","v_kodesia21","https://www.urionlinejudge.com.br/judge/en/profile/506558","B20236","Electrical"],
    ["27/12/2020 16:39:27","b20207@students.iitmandi.ac.in","Kanishk Singla","https://www.urionlinejudge.com.br/judge/en/profile/508602","B20207","Electrical"],
    ["27/12/2020 16:53:36","b20007@students.iitmandi.ac.in","dippin chachan","https://www.urionlinejudge.com.br/judge/en/profile/508810","B20007","Bioengg"],
    ["27/12/2020 16:56:18","b20210@students.iitmandi.ac.in","DHEERAJ MLV","https://www.urionlinejudge.com.br/judge/en/profile/505517","B20210","Electrical"],
    ["27/12/2020 17:00:17","b20173@students.iitmandi.ac.in","Yash Bhotmagey","https://www.urionlinejudge.com.br/judge/en/profile/508093","B20173","Data Science"],
    ["27/12/2020 17:09:11","b20023@students.iitmandi.ac.in","Sudhir kumar","https://www.urionlinejudge.com.br/judge/en/profile/508784","B20023","Bioengg"],
    ["27/12/2020 17:30:02","b20114@students.iitmandi.ac.in","MEENAL PATIDAR","https://www.urionlinejudge.com.br/judge/en/profile/508323","B20114","ComputerScience"],
    ["27/12/2020 17:43:26","b20087@students.iitmandi.ac.in","Ashutosh Sharma","https://www.urionlinejudge.com.br/judge/en/profile/508294","B20087","ComputerScience"],
    ["27/12/2020 17:57:54","b20272@students.iitmandi.ac.in","Aditi Singh","https://www.urionlinejudge.com.br/judge/en/profile/508818","B20272","Mechanical"],
    ["27/12/2020 18:42:33","b20085@students.iitmandi.ac.in","Aryansh Singla","https://www.urionlinejudge.com.br/judge/en/profile/508218","b20085","ComputerScience"],
    ["27/12/2020 18:59:40","b20284@students.iitmandi.ac.in","Chandresh Soni","https://www.urionlinejudge.com.br/judge/en/profile/508217","B20284","Mechanical"],
    ["27/12/2020 19:09:55","b20279@students.iitmandi.ac.in","Aryan Ali","https://www.urionlinejudge.com.br/judge/en/users/statistics/508312","B20279","Mechanical"],
    ["27/12/2020 19:15:14","b20232@students.iitmandi.ac.in","Janani","https://www.urionlinejudge.com.br/judge/en/profile/506592","B20232","Electrical"],
    ["27/12/2020 19:20:39","b20237@students.iitmandi.ac.in","Vanshaj Nathani","https://www.urionlinejudge.com.br/judge/en/profile/508220","B20237","Electrical"],
    ["27/12/2020 19:22:40","b20005@students.iitmandi.ac.in","Ayush Nigam","https://www.urionlinejudge.com.br/judge/en/profile/508170","B20005","Bioengg"],
    ["27/12/2020 19:57:50","b20024@students.iitmandi.ac.in","Sushant Manhas","https://www.urionlinejudge.com.br/judge/en/profile/508234","B20024","Bioengg"],
    ["27/12/2020 20:07:41","b20257@students.iitmandi.ac.in","PRACHEE MATHUR","https://www.urionlinejudge.com.br/judge/en/profile/508292","B20257","EngineeringPhysics"],
    ["27/12/2020 20:50:18","b20082@students.iitmandi.ac.in","Archana Nayak","https://www.urionlinejudge.com.br/judge/en/profile/508096","B20082","ComputerScience"],
    ["27/12/2020 20:57:45","b20090@students.iitmandi.ac.in","Bharat kumar","https://www.urionlinejudge.com.br/judge/en/profile/508454","B20090","ComputerScience"],
    ["27/12/2020 20:58:27","b20015@students.iitmandi.ac.in","MD SUFI HUSSAIN","https://www.urionlinejudge.com.br/judge/en/profile/508100","B20015","Bioengg"],
    ["27/12/2020 22:00:28","b20238@students.iitmandi.ac.in","Vikas Dangi","https://www.urionlinejudge.com.br/judge/en/profile/508840","B20238","Electrical"],
    ["27/12/2020 22:10:45","b20109@students.iitmandi.ac.in","Kanishak Garg","https://www.urionlinejudge.com.br/judge/en/profile/508216","B20109","ComputerScience"],
    ["27/12/2020 23:37:30","b20198@students.iitmandi.ac.in","Gautam D","https://www.urionlinejudge.com.br/judge/en/profile/508444","B20198","Electrical"],
    ["27/12/2020 23:43:11","b20171@students.iitmandi.ac.in","Vision Aggarwal","https://www.urionlinejudge.com.br/judge/en/profile/506450","B20171","DataScience"],
    ["28/12/2020 0:38:29","b20184@students.iitmandi.ac.in","Arun Patwa","https://www.urionlinejudge.com.br/judge/en/profile/506580","B20184","Electrical"],
    ["28/12/2020 2:47:07","b20123@students.iitmandi.ac.in","Rajat bansal","https://www.urionlinejudge.com.br/judge/en/profile/508111","B20123","ComputerScience"],
    ["28/12/2020 3:12:38","b20136@students.iitmandi.ac.in","Shruti Jain","https://www.urionlinejudge.com.br/judge/en/profile/508345","B20136","ComputerScience"],
    ["28/12/2020 10:09:34","b20199@students.iitmandi.ac.in","B20199 Gayatri Shridhar Kapse","https://www.urionlinejudge.com.br/judge/en/profile/508102","508102","Electrical"],
    ["28/12/2020 10:11:26","b20066@students.iitmandi.ac.in","Satyam Saroj","https://www.urionlinejudge.com.br/judge/en/profile/508271","b20066","Civil"],
    ["28/12/2020 11:11:42","b20093@students.iitmandi.ac.in","DEV PRAJAPAT","https://www.urionlinejudge.com.br/judge/en/profile/508269","B20093","ComputerScience"],
    ["28/12/2020 11:30:31","b20147@students.iitmandi.ac.in","B20147 AKSHAR SINGH","https://www.urionlinejudge.com.br/judge/en/profile/508088","B20147","DataScience"],
    ["28/12/2020 20:31:33","b20296@students.iitmandi.ac.in","B20296 Kushagra Agrawal","https://www.urionlinejudge.com.br/judge/en/profile/508917","B20296","Mechanical"],
    ["28/12/2020 21:50:36","b20035@students.iitmandi.ac.in","B20035 Bhavika Singh","https://www.urionlinejudge.com.br/judge/en/profile/508467","B20035 ","Civil"],
    ["29/12/2020 10:44:12","b20088@students.iitmandi.ac.in","AVNI","https://www.urionlinejudge.com.br/judge/en/profile/508745","B20088","ComputerScience"]
  ];

  for(i = 0; i < URIdata.length; i++)
  {
    //   console.log(URIdata[i][3]);
    var P = axios.get(URIdata[i][3])
    P.then((response) => {

        const $ = cheerio.load(response.data);
        console.log(URIdata[i][3]);
        var points = $(".pb-information > li:nth-child(5)").html();
        if (points != null)
        {
            points = points.split("\n")[2].trim();
            // console.log(points);
            URIdata[i].push(points);
            // console.log(URIdata[i][3]);
        }
        else
        {
            points = "0.0000";
            // console.log(points);
            URIdata[i].push(points);
        }
    })
    console.log(URIdata);
    
  }
