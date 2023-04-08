;(function(){

  let sticky = false
  let currentPosition = 0

  const imageCounter = $("[data-name='image-counter']").attr("content") //agregar el numero de las imagenes del slider -1
  /*constante donde defines tu correo*/
  const email = "mjefe96@gmail.com"

  /*comprobar si funciona el envio de datos en el formulario*/
  $("#contacto").on("submit",function(ev){
    ev.preventDefault()

    sendForm($(this))

    return false
  })
  /*esto ayuda a que funcione correctamente el sticky navigation*/

  $("#sticky-navigation").removeClass("hidden")
  $("#sticky-navigation").slideUp(0)
/*el contador de el slider de imgs*/
  setInterval(()=>{
    if (currentPosition < imageCounter) {
      currentPosition++
    }else{
      currentPosition = 0
    }

    $("#slider .inner").css({
      left: "-"+currentPosition*100+"%"
    })
  },4000)

/*esto es el efecto de el sticky navigation*/
  $(window).scroll(()=>{
    const inBottom = isInBottom()

  if(inBottom && !sticky){
    //mostrar la navegacion sticky
    sticky = true
    stickNavigation()
  }
  if(!inBottom && sticky){
    //ocultar  la navegacion sticky
    sticky = false
    unStickNavigation()
  }
})
  /*esto las animaciones del sticky navigation*/
  function stickNavigation(){
    $("#description").addClass("fixed").removeClass("absolute")
    $("#navigation").slideUp("fast")
    $("#sticky-navigation").slideDown("fast")
  }

  function unStickNavigation(){
    $("#description").removeClass("fixed").addClass("absolute")
    $("#navigation").slideDown("fast")
    $("#sticky-navigation").slideUp("fast")
  }
/*enviar formulario*/
  function sendForm($form){
    $.ajax({
        url: $form.attr("action"),
        method: "POST",
        data: $form.formObject(),
        dataType: "json",
        success: function(){
          alert("Todo ha resultado de maravilla")
        }
    })
  }
  /*saber cunado el usuario hace scrool y llega a bottom en window*/
  function isInBottom(){
    const $description = $("#description")
    const descriptionHeight = $description.height()

    return $(window).scrollTop() > $(window).height() - (descriptionHeight * 2)

  }

})()