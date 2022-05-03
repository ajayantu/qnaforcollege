exports.findBadge = (points)=>{
    let badge = 0;
    if(points<=10){
        badge=0;
    }
    else if(points >= 80 && points < 150){
        badge=1;
    }
    else if(points >= 150 && points < 200){
        badge=2;
    }
    else if(points >= 200 && points < 300){
        badge=3;
    }
    else if(points >= 300 && points < 400){
        badge=4;
    }
    else if(points >= 400 && points < 1000){
        badge=5;
    }
    else if(points >= 1000){
        badge=6;
    }
    return badge;
}