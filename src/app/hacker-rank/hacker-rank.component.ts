import { Component, OnInit } from '@angular/core';
import { HackerRankService} from '../services/hacker-rank.service'
import { ChartDataSets, ChartOptions } from 'chart.js';
import { Color, Label } from 'ng2-charts';
interface voteData {
  id: number;
  vote: number;
  flag: string;
 
}

@Component({
  selector: 'app-hacker-rank',
  templateUrl: './hacker-rank.component.html',
  styleUrls: ['./hacker-rank.component.css']
})
export class HackerRankComponent implements OnInit {

  page = 0;
  pageSize = 0;
  collectionSize = 0;
  stories: any =[] ;
  hits: any =[] ;
  sessionStoryData: any;


  lineChartData: ChartDataSets[] = [
    { data: [], label: 'Story Vote chart' },
  ];

  lineChartLabels: Label[] = [];
  lineChartOptions = {
    responsive: true,
    scales: { 
      yAxes: [{
         scaleLabel: {
            display: true,
            labelString: 'Votes',
         }
      }],
      xAxes: [{
        scaleLabel: {
           display: true,
           labelString: 'Id'
        }
     }]
   }
  };

  lineChartColors: Color[] = [
    {
      borderColor: 'black',
    },
  ];

  lineChartLegend = true;
  lineChartPlugins = [];
  lineChartType = 'line'
  constructor(private service : HackerRankService) {  
  

  }
  ngOnInit() {   
    this.sessionStoryData = JSON.parse(localStorage.getItem("sessionStoryData")) || [];
    this.refreshStories(this.page);
  }
  refreshStories(page) { 
      let currentDate = new Date();
      this.service.getStories(page).subscribe((data)=>{
          this.hits = data.hits;
          this.getDataFormat(this.hits);
          this.collectionSize =data.nbHits ;
          this.pageSize =data.hitsPerPage ;
      });
  }
  
  getDataFormat(data){
    let dataArr =[];
    let linechartlab =[];
    let linechartdata =[];
    let today = Math.round((new Date()).getTime() / 1000);
    let today2 = Math.round(new Date().getTime()/1000)

    let displayTime:string;
    data.map((item)=>{     
      let filterStory = this.sessionStoryData.filter((itemSession)=>{
        return itemSession.id==item.objectID
      })

    let story;
    let points;
    let flag;
    let created_at = item.created_at;
    let create_at_time = item.created_at_i;    
    let diffInSeconds = Math.abs(today - create_at_time);
    let hours = (diffInSeconds) / 60/ 60;
    let noofDays = hours/24
     if(noofDays>=2){
        displayTime = Math.floor(noofDays)+' days ago';
     }
     else if(noofDays>=1 && noofDays<2) {
        displayTime =' 1 day ago';
     } else {
       if(hours>2){
          displayTime = (Math.round(hours))+' hours ago';
       } else {
          displayTime = (Math.round(hours))+' hour ago';
       }
     }
      let newurl ;
      if(item.url!==null){
        const ulrarr = item.url.split('/');   
        if(length>=0){
          newurl = ulrarr[2];
        } 
      } else {
        newurl='';
      }
      if(filterStory.length>0){
        points =filterStory[0].updatedVote;   
        flag =filterStory[0].flag;         
      
      }else{
        points =item.points;     
        flag =false;         
    
      }
      
      story ={
        objectID:item.objectID,
        num_comments:item.num_comments,
        points:points,
        title:item.title,
        author: item.author,
        flag:flag,
        time:displayTime,
        url:newurl
      };
      dataArr.push(story);
      linechartlab.push(item.objectID);
      linechartdata.push(points);
     
    });
    this.stories =dataArr;
    this.lineChartLabels =linechartlab;
    this.lineChartData[0].data = linechartdata;
  }
  upVote(id,vote,flag,str){  
    var sessionData = this.sessionStoryData.find(function(e) {     
       return e.id == id; 
      });
    if (sessionData!==undefined) {
      if(str=='vote')
      sessionData.updatedVote += 1;
      if(str=='hide')
      sessionData.flag = true; 
    } else {
      let updatedVote =vote;
      let flag =false;
      if(str=='vote') {
        updatedVote = vote+1;
      }
      if(str=='hide') {
         flag = true;
      }
      this.sessionStoryData.push({
            id: id,
            updatedVote: updatedVote,
            flag : flag
        });
    }
    this.setSessionData();
    this.getDataFormat(this.hits);
  }
  setSessionData() {
    localStorage.setItem('sessionStoryData', JSON.stringify(this.sessionStoryData));
  }
  getPage(pageData){
    this.page=pageData;
    this.refreshStories(this.page);
  }

}
