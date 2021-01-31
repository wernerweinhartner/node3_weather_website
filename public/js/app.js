console.log('Client side javascript file')


/*fetch('http://puzzle.mead.io/puzzle').then((response)=>{ //promise
    response.json().then((data)=>{
        console.log(data)
    })
})


fetch('http://localhost:3000/weather?address='+encodeURIComponent(location)).then((response)=>{
    response.json().then((data)=>{
        if (data.error){
            return console.log(data.error)
        }
        console.log(data.Location)
        console.log(data.Temperature)
    })
})
*/
const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const p1 = document.querySelector('#p1') // # para pegar por id




weatherForm.addEventListener('submit', (e)=>{ //e = event
    e.preventDefault() //para o form nao resetar
    p1.textContent = 'Loading...'
    p2.textContent = ''

    const location = search.value //para pegar o valor que foi digitado (input)

    //console.log(location)
    fetch('/weather?address='+encodeURIComponent(location)).then((response)=>{
    response.json().then((data)=>{
        if (data.error){
            p1.textContent = 'Invalid search'
            return console.log(data.error)
        }
        console.log(data.Location)
        p1.textContent = data.Location //para modificar o texto do paragrafo p
        console.log(data.Temperature)
        p2.textContent = data.Temperature
        
    })
})
})