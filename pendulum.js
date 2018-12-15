
var X = 401;
var Y = 401;     

var G = 1;

var m1 = 40;
var m2 = 20;

var l1 = 150;
var l2 = 150;

var angvel1 = 0;
var angvel2 = 0;

var theta1 = 0;
var theta2 = 0;

var x1 = 0;
var x2 = 0;
var y1 = 0;
var y2 = 0;

var drag1 = false;
var drag2 = false;

var gslide, m1slide, m2slide, l1slide, l2slide;

function setup() {
    createCanvas(801, 801);
    smooth();
    frameRate(60);
}

function run() {
    t1 = -G * (2 * m1 + m2) * sin(theta1);
    t2 = -m2 * G * sin(theta1 - 2 * theta2);
    t3 = -2 * sin(theta1 - theta2) * m2 * (pow(angvel1, 2) * l2 + pow(angvel1, 2) * l1 * cos(theta1 - theta2));

    denom = l1 * (2 * m1 + m2 - m2 * cos(2 * theta1 - 2 * theta2));

    angacc1 = (t1 + t2 + t3) / denom;

    t1 = pow(angvel1, 2) * l1 * (m1 + m2);
    t2 = G * (m1 + m2) * cos(theta1);
    t3 = pow(angvel2, 2) * l2 * m2 * cos(theta1 - theta2);

    denom = l2 * (2 * m1 + m2 - m2 * cos(2 * theta1 - 2 * theta2));

    angacc2 = 2 * sin(theta1 - theta2) * (t1 + t2 + t3) / denom;

    angvel1 -= angacc1;
    angvel2 -= angacc2;

    theta1 -= angvel1;
    theta2 -= angvel2;
}

function draw() {
    if(!drag1 && !drag2) run();

    fill(255, 50);
    rect(0,0,width,height);

    strokeWeight(25);
    stroke(0);

    x1 = X + cos(theta1 + PI/2) * l1;
    y1 = Y + sin(theta1 + PI/2) * l1;

    x2 = x1 + cos(theta2 + PI/2) * l2;
    y2 = y1 + sin(theta2 + PI/2) * l2;

    line(X, Y, x1, y1);
    line(x1, y1, x2, y2);

    strokeWeight(0);
    fill(255);

    ellipse(x2, y2, 20, 20);
    ellipse(x1, y1, 20, 20);

    ellipse(X, Y, 20, 20);
}

function mousePressed() {
    if(dist(mouseX, mouseY, x1, y1) < 20) {
        drag1 = true;
    }

    if(dist(mouseX, mouseY, x2, y2) < 20) {
        drag2 = true;
    }
}

function mouseReleased() {
    drag1 = false;
    drag2 = false;
}

function mouseDragged() {
    if(drag1) {
        theta1 = atan2(mouseY - Y, mouseX - X) - PI/2;
    }

    if(drag2) {
        theta2 = atan2(mouseY - y1, mouseX - x1) - PI/2;
    }
}