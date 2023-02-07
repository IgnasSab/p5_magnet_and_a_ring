let rectWidth = 100
let rectHeight = 60
let start = false
let transition = false
let speedRectHeight = 1.2
let accelerationRectWidth = 0.25
let speedRectWidth = (rectWidth/rectHeight)*speedRectHeight
let originalRectWidth = rectWidth
let originalRectHeight = rectHeight
let position = 1
let strokeWeightArc = 50
let middleRingHeight = 2.8*strokeWeightArc
let middleRingWidth = 35
let lineLength = 0
let maxLineLength = 250
let triangleHeight = 15
let dragged = false
let maxMagnets = 30
let magnetPosition = []
let magnetPoisitionTrace = []
let lineStrokeWeight = 5
let color = (0, 255, 0)
let constant = 2.8/3

function setup() {
    cnv = createCanvas(windowWidth, windowHeight);
    background(100)
    ringVector = createVector(width/2, height/3)
    origin = createVector(width/2, height*(2/3))
    myVector = createVector() 
    myVector = origin  
    rectPos()
    for(let i = 0; i <= 21; i++){
        magnetPosition.push({x: myVector.x, y: myVector.y})
    }
}

function draw() {

    background(100)

    if (mouseButton === LEFT & mouseIsPressed === true & start === false & mouseX >= origin.x - originalRectWidth & mouseX <= origin.x + originalRectWidth & mouseY >= origin.y - rectHeight/2 & mouseY <= origin.y + rectHeight/2){
        start = true
    }

    if (start === true & mouseIsPressed === true & mouseButton === LEFT){
        if(ringVector.y-middleRingHeight/2 > mouseY - originalRectHeight/2 & ringVector.y-middleRingHeight-strokeWeightArc < mouseY -  originalRectHeight/2 & mouseX - originalRectWidth < ringVector.x + strokeWeightArc/2 & mouseX + originalRectWidth > ringVector.x - strokeWeightArc/2){
            myVector.x = mouseX
            if(mouseY - originalRectHeight/2 > ringVector.y-middleRingHeight/2-strokeWeightArc-8){myVector.y = ringVector.y-middleRingHeight/2+originalRectHeight/2}
            else{myVector.y = ringVector.y-middleRingHeight/2-strokeWeightArc-8-originalRectHeight/2}
        }
        else if(ringVector.y+middleRingHeight/2 < mouseY+originalRectHeight/2 & ringVector.y+middleRingHeight+strokeWeightArc > mouseY+originalRectHeight/2 & mouseX - originalRectWidth < ringVector.x + strokeWeightArc/2 & mouseX + originalRectWidth > ringVector.x - strokeWeightArc/2){
            myVector.x = mouseX
            if(mouseY + originalRectHeight/2 < ringVector.y + middleRingHeight/2+strokeWeightArc+8){myVector.y = ringVector.y + middleRingHeight/2-originalRectHeight/2}
            else{myVector.y = ringVector.y+middleRingHeight/2+strokeWeightArc+8+originalRectHeight/2}
        }

        else{
            myVector.x = mouseX
            myVector.y = mouseY
        }
        magnetPosition.push({x: myVector.x, y: myVector.y})
        magnetPositionTrace.push({x: myVector.x, y: myVector.y})

        if(magnetPositionTrace.length > maxMagnets){
            magnetPositionTrace.shift()
            magnetPosition.shift()
        }
        trace()
        rectPos()
    }
    else {
        magnetPositionTrace = []
        dragged = false
    }

    if (myVector.y-originalRectHeight/2 > ringVector.y-middleRingHeight & myVector.y+originalRectHeight/2 < ringVector.y+middleRingHeight & mouseX-pmouseX !== 0 & mouseIsPressed === true & mouseButton === LEFT){
        dragged = true 
    }
    if (myVector.y+originalRectHeight/2 <= ringVector.y-middleRingHeight/2-strokeWeightArc || myVector.y-originalRectHeight/2 >= ringVector.y+middleRingHeight/2+strokeWeightArc & mouseX-pmouseX !== 0 & mouseIsPressed === true & mouseButton === LEFT){
        dragged = false
    }

    ring2() 

    rectPos()
    magnetTransition()

    drawArrow() 

    ring1()
   
    

}
function trace(){
    for(let i = 0; i<magnetPositionTrace.length; i+= 1){
    push()
    stroke(0)
    strokeWeight(3)
    rectMode(CENTER)

    fill(255, 0, 0,150)
    rect(magnetPositionTrace[i].x -i*(rectWidth/rectHeight)/2, magnetPositionTrace[i].y, i*(rectWidth/rectHeight), i)
    fill(0, 0, 255, 150)
    rect(magnetPositionTrace[i].x + i*(rectWidth/rectHeight)/2, magnetPositionTrace[i].y, i*(rectWidth/rectHeight), i)
    pop()
    }
    

}

function drawArrow(){
    console.log(dragged)
    if(magnetPosition.length > 20){
    if(dragged){lineLength = (magnetPosition[magnetPosition.length-1].x - magnetPosition[magnetPosition.length-20].x)/2; lineStrokWeight = 5; triangleHeight = 15}
    else if (!dragged){lineLength = 0; triangleHeight = 0; lineStrokWeight = 0}
    if(myVector.x < ringVector.x){lineLength = -1*lineLength}
    for(let j = ringVector.y-((3*strokeWeightArc)*4/5)/2; j < ringVector.y+3*strokeWeightArc/2;j += (3*strokeWeightArc)/5)
    {
        push()
        strokeWeight(lineStrokWeight)
        stroke(0,255,0)
        line(ringVector.x-lineLength, j, ringVector.x+lineLength, j)
        pop()
    
        push()
        stroke(255)
        strokeWeight(lineStrokWeight/5)
        fill(0, 255, 0)
        
    
            if(position === 1 & lineLength < 0){
                triangle(ringVector.x+lineLength, j+triangleHeight/2, ringVector.x+lineLength, j-triangleHeight/2,ringVector.x+lineLength-triangleHeight, j)
            }
            else if(position === 1 & lineLength >= 0){
                triangle(ringVector.x+lineLength, j+triangleHeight/2, ringVector.x+lineLength, j-triangleHeight/2,ringVector.x+lineLength+triangleHeight, j)
            }
            else if(position === 2 & lineLength < 0){
                triangle(ringVector.x-lineLength, j+triangleHeight/2, ringVector.x-lineLength, j-triangleHeight/2,ringVector.x-lineLength+triangleHeight, j)
            }
            else if(position === 2 & lineLength >= 0){
                triangle(ringVector.x-lineLength, j+triangleHeight/2, ringVector.x-lineLength, j-triangleHeight/2,ringVector.x-lineLength-triangleHeight, j)
            }
        pop()
    }
    
    }
}


function rectPos(){

    push()
    stroke(0)
    strokeWeight(3)
    rectMode(CENTER)

    fill(255, 0, 0)
    rect(myVector.x - rectWidth / 2, myVector.y, rectWidth, rectHeight)
    fill(0, 0, 255)
    rect(myVector.x + rectWidth / 2, myVector.y, rectWidth, rectHeight)
    pop()

    push()
    textAlign(CENTER, CENTER)
    textSize(40)
    fill(255)
    strokeWeight(3)

    text('S', myVector.x - rectWidth / 2, myVector.y + rectHeight / 15)
    text('N', myVector.x + rectWidth / 2, myVector.y + rectHeight / 15)
    pop()

}

function magnetTransition()
{

    if(mouseButton === RIGHT & mouseIsPressed === true){
        transition = true
    }
    if(transition === true & position === 1 & originalRectWidth >= -1*rectWidth){
        rectWidth -= speedRectWidth
        if(rectWidth > 0){speedRectWidth += accelerationRectWidth}
        else{speedRectWidth -= accelerationRectWidth}
        rectPos()
    }
    if(transition === true & position === 2 & originalRectWidth >= rectWidth){
        if(rectWidth < 0){speedRectWidth += accelerationRectWidth}
        else{speedRectWidth -= accelerationRectWidth}
        rectWidth += speedRectWidth
        rectPos()
    }
    if(originalRectWidth <= -1*rectWidth & position === 1){
        position = 2
        transition = false
    }
    if(originalRectWidth <= rectWidth & position === 2){
        position = 1
        transition = false
    }
}

function ring1(){
    push()
    
    strokeWeight(5)
    stroke(0)
    fill(100, 0)
    arc(ringVector.x, ringVector.y, middleRingWidth, 2.95*strokeWeightArc, PI/2, -PI/2)

    pop()
    push()
    
    strokeWeight(strokeWeightArc)
    stroke(0,100)
    fill(100, 0)
    arc(ringVector.x, ringVector.y, originalRectHeight*1.5, originalRectWidth*2, PI/2, -PI/2)

    pop()
    push()
    
    strokeWeight(8)
    stroke(0)
    fill(100, 0)
    arc(ringVector.x, ringVector.y, originalRectHeight*1.5+strokeWeightArc, originalRectWidth*2+strokeWeightArc, PI/2, -PI/2)

    pop()
}
function ring2(){
    push()
    strokeWeight(5)
    stroke(50)
    fill(100, 0)
    arc(ringVector.x, ringVector.y, middleRingWidth, 2.95*strokeWeightArc, -PI/2, PI/2)
    pop()

    push()
    strokeWeight(strokeWeightArc)
    stroke(0, 20)
    fill(100, 0)
    arc(ringVector.x, ringVector.y, originalRectHeight*1.5, originalRectWidth*2, -PI/2, PI/2)
    pop()

    push()
    strokeWeight(8)
    stroke(0)
    fill(100, 0)
    arc(ringVector.x, ringVector.y, originalRectHeight*1.5+strokeWeightArc, originalRectWidth*2+strokeWeightArc, -PI/2, PI/2)
    pop()

}

