exports.findBadge = (points)=>{
    let badge = 0;
    if(points<=10){
        badge=0;
    }
    else if(points >= 150 && points < 300){
        badge=1;
    }
    else if(points >= 300 && points < 500){
        badge=2;
    }
    else if(points >= 500 && points < 850){
        badge=3;
    }
    else if(points >= 850 && points < 1000){
        badge=4;
    }
    else if(points >= 1000 && points < 1200){
        badge=5;
    }
    else if(points >= 1200){
        badge=6;
    }
    return badge;
}