import { Component, OnInit } from '@angular/core';
import { HackerRankService} from '../services/hacker-rank.service'
import { getLocaleDateFormat } from '@angular/common';
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
  constructor(private service : HackerRankService) {  
    this.refreshStories();

  }
  ngOnInit() {
   
    console.log(sessionStorage.getItem('sessionStoryData'));
    this.sessionStoryData = JSON.parse(sessionStorage.getItem("sessionStoryData")) || [];

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
    data.map((item)=>{     
     // console.log('item \n'+JSON.stringify(item))
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
    });
    this.stories =dataArr;
  }
  upVote(id,vote,flag,str){  
    //console.log('object id clickec  =='+id)
    var sessionData = this.sessionStoryData.find(function(e) {     
       return e.id == id; 
      });
    console.log('sessionData'+sessionData);
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
    this.page =pageData
  }
  
}
