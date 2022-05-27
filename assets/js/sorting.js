let arr = [];
let nums;
var navbuttons = document.querySelectorAll(".nav-buttons");
let ar = [0, 0, 0, 0, 0, 0];

for(let i = 0; i < 6; i++){
  navbuttons[i].addEventListener("click", function(event) {
    ar = [0, 0, 0, 0, 0, 0];
    console.log(this.innerHTML + " will be performed");
    ar[i] = 1;
    console.log(ar);
  });
}

function Sort() {
  console.log("Sorting");
  let index = -1;
  for(let i = 0; i < 6; i++){
    if(ar[i] === 1){
      index = i;
    }
  }
  console.log(index);

  if(index == -1){
    alert("Select the topic you wish to understand");
  }
  else{
    if(ar[0] === 1)
    selectionSort();
    else if(ar[1] === 1)
    bubbleSort();
    else if(ar[2] === 1)
    insertionSort();
    else if(ar[3] === 1)
    heapSort();
    else if(ar[4] === 1)
    mergeSort();
    else if(ar[5] === 1)
    quickSort();
  }
}

function generateRandom(){
  for(let i = 0; i < 10; i++){
    let n = Math.floor(Math.random() * 1001);
    arr[i] = n;

    document.getElementById("array-box" + i).innerHTML = arr[i];
  }

  nums = document.querySelectorAll('.box');

  for(let i = 0; i < 10; i++){
    nums[i].classList.remove("sorted");
  }
}

let n = 10;

async function wait() {
    let promise = new Promise((resolve, reject) => {
        setTimeout(() => resolve("done"), 1000 / 2);
    });
    let res = await promise;
}

async function waitforSort() {
    let promise = new Promise((resolve, reject) => {
        setTimeout(() => resolve("done"), 100);
    });
    let res = await promise;
}

async function colorUp() {
    for (let i = 0; i < n; i++) {
        nums[i].classList.add('sorted');
        await wait();
    }
}

function removeColor() {
    if (!nums[0].classList.contains('sorted'))
        return;
    for (let i = 0; i < n; i++)
        nums[i].classList.remove('sorted');
}

function removeOne(i) {
    nums[i].classList.remove('pointer2');
    nums[i].classList.remove('pointer1');
    nums[i].classList.remove('pointer3');
}

function updateOne(i, color) {
    removeOne(i);
    nums[i].classList.add(color);
}

function updateTwo(i, j, color) {
    updateOne(i, color);
    updateOne(j, color);
}

function removeTwo(i, j) {
    removeOne(i);
    removeOne(j);
}

function swap(j, i) {
    let t = arr[j];
    arr[j] = arr[i];
    arr[i] = t;
    nums[i].innerHTML = arr[i];
    nums[j].innerHTML = arr[j];
}

function lockAllButtons() {
    navbuttons.forEach(i => {
        i.disabled = true;
    })
}

function enableAllButtons() {
    navbuttons.forEach(i => {
        i.disabled = false;
    })
}

async function selectionSort() {
    let smallestIndex = 0,
        currentIndex = 0;
    while (currentIndex <= n - 1) {
        smallestIndex = currentIndex;
        nums[currentIndex].classList.add('pointer2');
        for (let j = currentIndex + 1; j < n; j++) {
            nums[j].classList.add('pointer2');
            await wait();
            if (arr[smallestIndex] > arr[j]) {
                nums[smallestIndex].classList.remove('pointer1');
                smallestIndex = j;
                updateTwo(smallestIndex, currentIndex, 'pointer1');
                await wait();
            }
            nums[j].classList.remove('pointer2');
        }
        swap(smallestIndex, currentIndex);
        await wait();
        removeTwo(smallestIndex, currentIndex);
        nums[currentIndex].classList.add('sorted');
        currentIndex++;
    }
    enableAllButtons();
}

async function bubbleSort() {
    for (let i = 0; i < n; i++) {
        for (let j = 0; j < n - i - 1; j++) {
            updateTwo(j, j + 1, 'pointer2');
            await wait();
            if (arr[j] > arr[j + 1]) {
                updateTwo(j, j + 1, 'pointer1');
                await wait();
                swap(j, j + 1);
                await wait();
            }
            removeTwo(j + 1, j);
        }
        nums[arr.length - i - 1].classList.add('sorted');
    }
    enableAllButtons();
}

async function insertionSort() {

    for (let i = 1; i < n; i++) {
        let j = i;
        updateOne(i, 'pointer2');
        await wait();
        while (j > 0 && arr[j] < arr[j - 1]) {
            updateTwo(j, j - 1, 'pointer1');
            await wait();
            swap(j, j - 1);
            await wait();
            removeTwo(j, j - 1);
            if (j == i) {
                updateOne(j, 'pointer2');
            }
            j--;
        }
        removeOne(i);
    }

    await colorUp();
    enableAllButtons();
}

async function heapSort() {
    for (let i = Math.floor(n / 2) - 1; i >= 0; i--) {
        updateOne(i, 'pointer2');
        await wait();
        await siftDown(n, i);
        removeOne(i);
    }

    for (let i = n - 1; i >= 1; i--) {
        updateTwo(i, 0, 'pointer1');
        await wait();
        swap(i, 0);
        await wait();
        updateOne(i, 'pointer2');
        await siftDown(i, 0);
        removeOne(i);
        updateOne(i, 'sorted');
    }
    updateOne(0, 'sorted');
    enableAllButtons();
}

async function siftDown(n, i) {
    let largest = i;
    let l = 2 * i + 1;
    let r = 2 * i + 2;

    if (l < n && arr[l] > arr[largest])
        largest = l;

    if (r < n && arr[r] > arr[largest])
        largest = r;

    if (largest != i) {
        updateTwo(i, largest, 'pointer1');
        await wait();
        swap(i, largest);
        await wait();
        removeTwo(i, largest);
        await siftDown(n, largest);
    }
}

async function mergeSort() {
    await merge_partition(0, n - 1);

    for (let i = 0; i < n; i++) {
        updateOne(i, 'sorted');
        await wait();
    }
    enableAllButtons();
}

async function merge(start, mid, end) {
    let p = start,
        q = mid + 1;
    let a = [],
        k = 0;

    for (let i = start; i <= end; i++) {
        if (p > mid) {
            a[k++] = arr[q++];
            updateOne(p - 1, 'pointer1');
            updateOne(mid, 'pointer1');
        } else if (q > end) {
            a[k++] = arr[p++];
            updateOne(p - 1, 'pointer1');
            updateOne(end, 'pointer1');
        } else if (arr[p] < arr[q]) {
            a[k++] = arr[p++];
            updateOne(p - 1, 'pointer1');
            updateOne(q - 1, 'pointer1');
        } else {
            a[k++] = arr[q++];
            updateOne(q - 1, 'pointer1');
        }
        await wait();
    }

    for (let t = 0; t < k; t++) {
        arr[start++] = a[t];
        if (nums[start - 1].innerHTML !== arr[start - 1]) {
            nums[start - 1].innerHTML = arr[start - 1];
            await wait();
        }
        removeOne(start - 1);
    }
}

async function merge_partition(start, end) {
    if (start < end) {
        let mid = Math.floor((start + end) / 2);
        updateOne(mid, 'pointer2');
        await wait();
        await merge_partition(start, mid);
        await merge_partition(mid + 1, end);
        await merge(start, mid, end);
    }
}

async function quickSort() {
    await sorter(0, n - 1);
    await colorUp();
    enableAllButtons();
}

async function sorter(l, r) {
    if (l >= r)
        return;

    let pivot = l,
        leftIndex = l + 1,
        rightIndex = r;

    updateOne(pivot, 'pointer2');

    while (rightIndex >= leftIndex) {
        updateOne(leftIndex, 'pointer3');
        updateOne(rightIndex, 'pointer3');
        await wait();

        if (arr[rightIndex] < arr[pivot] && arr[leftIndex] > arr[rightIndex]) {
            updateTwo(leftIndex, rightIndex, 'pointer1');
            await wait();
            swap(leftIndex, rightIndex);
            await wait();
            removeTwo(leftIndex, rightIndex);
            updateTwo(leftIndex, rightIndex, 'pointer3');
        }
        if (arr[leftIndex] <= arr[pivot]) {
            removeOne(leftIndex);
            leftIndex++;
        }
        if (arr[rightIndex] >= arr[pivot]) {
            removeOne(rightIndex);
            rightIndex--;
        }
    }

    if (pivot !== rightIndex) {
        updateTwo(pivot, rightIndex, 'pointer1');
        await wait();
        swap(pivot, rightIndex);
        await wait();
    }
    removeTwo(pivot, rightIndex);

    await sorter(l, rightIndex - 1);
    await sorter(rightIndex + 1, r);
}

function selection(){
  document.getElementById("algorithm").innerHTML = "<object data='./assets/text/selectionSort.txt'></h1>";
}

function bubble(){
  document.getElementById("algorithm").innerHTML = "<object data='./assets/text/bubbleSort.txt'></h1>";
}

function insertion(){
  document.getElementById("algorithm").innerHTML = "<object data='./assets/text/insertionSort.txt'></h1>";
}

function heapify(){
  document.getElementById("algorithm").innerHTML = "<object data='./assets/text/heapSort.txt'></h1>";
}

function mer(){
  document.getElementById("algorithm").innerHTML = "<object data='./assets/text/mergeSort.txt'></h1>";
}

function quicky(){
  document.getElementById("algorithm").innerHTML = "<object data='./assets/text/quickSort.txt'></h1>";
}

window.onload = generateRandom();
