console.log('Client side javascript file is loaded!')



const weatherForm=document.querySelector('form')
const searchText=document.querySelector('input')
const messageOne=document.querySelector('#messageOne')
const messageTwo=document.querySelector('#messageTwo')


//messageOne.textContent=''
weatherForm.addEventListener('submit',(event)=>{
  event.preventDefault() //important, dont allow refresh
  const location = searchText.value
  messageOne.textContent='Loading...'
  messageTwo.textContent=''
  fetch('/weather?address='+location).then((response)=>{
    response.json().then((data)=>{
      if (data.error){
        messageOne.textContent=data['error']
      }else{
        messageOne.textContent=data['location']
        messageTwo.textContent=data['forecast']
      }
    })
  })
})
