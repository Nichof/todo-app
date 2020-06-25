const btn = document.querySelector('input[type="submit"]');
const resetBtn = document.querySelector('input[type="button"]');
const inputText = document.querySelector('input[type="text"]');
const ul = document.querySelector('ul');
const removeDoneBtn = document.querySelector('button');

function render(list) { 
    ul.innerHTML = '';

    if ('list' in localStorage && localStorage.list.length !== 0 ) { 
        ulHTML = '';
        list.forEach(( value, index ) => { 
            ulHTML = ulHTML + '<li id="' + index + '" class="' + value.done + '">' + value.inputText + '</li>' 
            });
        ul.innerHTML = ulHTML;   
    }
}

btn.onclick =  (e) => {
    e.preventDefault();
    
    if (!('list' in localStorage)) {
        localStorage.setItem('list', '[]')
    render(JSON.parse(localStorage.getItem('list')))
    }
    

    if (inputText.value !== '') {
        let list = JSON.parse(localStorage.getItem('list'))  ;
        list.push({inputText: inputText.value, done:'no'});
        localStorage.setItem('list', JSON.stringify(list));
        render(list);

    } else {
        alert('Please input a todo item. :)');
    }
    
};

ul.onclick = (e) => {
    const target = e.target;
    let list = JSON.parse(localStorage.getItem('list'));
    console.log(list)

    if (list[target.id].done === 'no') {
        console.log('no branch')
        list[target.id].done = 'yes';
        console.log(list);
        localStorage.setItem('list', JSON.stringify(list)) ;
        render(list);

    } else if (list[target.id].done === 'yes'  ) {
        console.log('yes branch')
        list[target.id].done = 'no';
        console.log(list);
        localStorage.setItem('list', JSON.stringify(list)) ;
        render(list);
    }     
}

removeDoneBtn.onclick = (e) => {
    let list = JSON.parse(localStorage.getItem('list'));
    let undoneList = [];
    list.forEach((value) => { 
        if (value.done === 'no') {
            undoneList.push(value);
        }
    })
    localStorage.setItem('list', JSON.stringify(undoneList))
}

resetBtn.onclick = e => {
    localStorage.removeItem('list');
    ul.innerHTML ='';
}

if (!('list' in localStorage) ) {
        localStorage.setItem('list', '[]');
    }

render(JSON.parse(localStorage.getItem('list')));
