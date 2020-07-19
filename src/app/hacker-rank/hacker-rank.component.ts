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

  page = 1;
  pageSize = 5;
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
    hAxis: {
      title: 'Time'
    },
    vAxis: {
      title: 'Popularity'
    },
  };

  lineChartColors: Color[] = [
    {
      borderColor: 'black',
      //backgroundColor: 'rgba(255,255,0,0.28)',
    },
  ];

  lineChartLegend = true;
  lineChartPlugins = [];
  lineChartType = 'line'
  constructor(private service : HackerRankService) {  
  

  }
  ngOnInit() {   
    console.log(sessionStorage.getItem('sessionStoryData'));
    this.sessionStoryData = JSON.parse(sessionStorage.getItem("sessionStoryData")) || [];
    this.refreshStories();
  }
  refreshStories() { 
      let currentDate = new Date();
      this.service.getStories().subscribe((data)=>{
          this.hits = data.hits;
          this.getDataFormat(this.hits);
          this.collectionSize =this.hits.length  ;
         
      });
  }
  getDataFormat(data){
    let dataArr =[];
    let linechartlab =[];
    let linechartdata =[];
    data.map((item)=>{     
      let filterStory = this.sessionStoryData.filter((itemSession)=>{
        return itemSession.id==item.objectID
      })

      let story;
      let points;
      let flag;
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
        flag:flag
      };
      dataArr.push(story);
      linechartlab.push(item.objectID);
      linechartdata.push(points);
     
    });
    this.stories =dataArr;
    this.lineChartLabels =linechartlab;
    this.lineChartData[0].data = linechartdata;
    //this.lineChartLabels.slice((this.page-1)*(this.pageSize),(this.page-1)*(this.pageSize)+this.pageSize);
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
    sessionStorage.setItem('sessionStoryData', JSON.stringify(this.sessionStoryData));
  }
  getPage(pageData){
    this.page =pageData;

  }
  
}
