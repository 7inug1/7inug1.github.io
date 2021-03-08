/*
해당 프로그램은 두 가지 기능을 구현하는 것으로 마감되었습니다.

1. fetchAPI()
: 해당 function을 통해 root page에 API에서 가져온 아이템을 배치합니다.

2. getIntoDirectory()
: root page에 깔린 아이템을 클릭하면 아이템에 해당되는 ID로 API fetching을 하여 File과 Directory를 구분하여 배치합니다.
*/

'use strict';

let url = 'https://zl3m4qq0l9.execute-api.ap-northeast-2.amazonaws.com/dev';
let Nodes = document.querySelector('.Nodes')
let catNameArray = [];
let rootDirString = '';

Nodes.addEventListener('click', event => {getIntoDirectory(event)});
fetchAPI();

function fetchAPI(){
    fetch(url)
    .then((response) => response.json())
    .then((data) => {
        // save Cat names into the array
        data.forEach(element => catNameArray.push(element.name));

        // making a string to show root page of cat directories
        catNameArray.forEach(element => {
            rootDirString+=`
                <div class="Node" key="${element}">
                <img src="./assets/directory.png">
                <div>${element}</div>
                </div>
            `
        });
        // DOM manipulation
        Nodes.insertAdjacentHTML( 'beforeend', rootDirString );
    })
}

// Event Delegation
function getIntoDirectory(event){
    let key = event.target.parentElement.getAttribute('key');
    
    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        for (let cat of data) {
            if (cat.name===key){
                fetch(`${url}/${cat.id}`)
                .then((response) => response.json())
                .then((innerdata) => {
                    let totalString = `
                        <div class="Node">
                        <img src="./assets/prev.png">
                        </div>
                    `;
                    let FILEstring = '';
                    let DIRECTORYstring = '';
                    
                    for(let item of innerdata){
                        console.log(item.type)
                        if(item.type === "FILE"){
                            FILEstring+=`
                                <div class="Node">
                                <img src="./assets/file.png">
                                <div>${item.name}</div>
                                </div>
                            `
                        }else{
                            DIRECTORYstring+=`
                                <div class="Node">
                                <img src="./assets/directory.png">
                                <div>${item.name}</div>
                                </div>
                            `
                        }
                    }
                    totalString+=FILEstring;
                    totalString+=DIRECTORYstring;
                    Nodes.insertAdjacentHTML('beforeend', totalString);
                })
                break;
            }
        }
    })
}
