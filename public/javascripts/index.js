window.addEventListener("DOMContentLoaded", async (event) =>{
    const commentList = document.querySelector('.commentList')
    const commentBtn = document.querySelector('#submitBtn')


    const editBtnPug = document.querySelectorAll('.editBtn')
    editBtnPug.forEach(btns => {
      btns.addEventListener("click", event => {
        const commentBody = event.target.parentElement.previousSibling.previousSibling
            event.target.hidden= true
            event.target.nextSibling.hidden= true
            event.target.nextSibling.nextSibling.hidden= false
            event.target.nextSibling.nextSibling.nextSibling.hidden= false
            commentBody.setAttribute("contenteditable","true")
            event.preventDefault()
      })
    })

    const DeleteBtnPug = document.querySelectorAll('.deleteBtn')
    DeleteBtnPug.forEach(btns => {
      btns.addEventListener("click", event => {
        const commentBody = event.target.parentElement.previousSibling.previousSibling
        event.target.hidden= true
        event.target.nextSibling.hidden= true
        event.target.nextSibling.nextSibling.hidden= false
        event.target.nextSibling.nextSibling.hidden= false
        commentBody.setAttribute("contenteditable","true")
        event.preventDefault()
      })
    })

    const editCancelBtnPug = document.querySelectorAll('.editCancelBtn')
    editCancelBtnPug.forEach(btns => {
      btns.addEventListener("click", event => {
        const commentBody = event.target.parentElement.previousSibling.previousSibling
        event.target.hidden= true
        event.target.nextSibling.hidden= true
        event.target.previousSibling.hidden= false
        event.target.previousSibling.previousSibling.hidden= false
        commentBody.setAttribute("contenteditable","false")
        event.preventDefault()
      })
    })

    const editSubmitBtnPug = document.querySelectorAll('.editSubmitBtn')
    editSubmitBtnPug.forEach(btns => {
      btns.addEventListener("click", event => {
        const commentBody = event.target.parentElement.previousSibling.previousSibling
        event.target.hidden= true
        event.target.previousSibling.hidden= true
        event.target.previousSibling.previousSibling.hidden= false
        event.target.previousSibling.previousSibling.previousSibling.hidden= false
        commentBody.setAttribute("contenteditable","false")
        event.preventDefault()
      })
    })

    if (commentBtn) {
      commentBtn.addEventListener("click", async event => {

          // if(){

          // }
          const _csrf = document.querySelector('#token').value;
          event.preventDefault();
          const userInput = document.querySelector('.form-control').value
          document.querySelector('.form-control').value = '';
          const newDivArea = document.createElement('div');
          const storyId = event.target.dataset.storyId;
          newDivArea.innerText = userInput;
          newDivArea.classList.add('commentContent')
          const body = { body: userInput, _csrf }





            try {
                const commentResponse = await fetch(`/stories/${storyId}/comments`, {
                  method: "POST",
                  body: JSON.stringify(body),
                  headers: { "Content-Type": "application/json" },
                });

                // Converts to JSON
                const commentData = await commentResponse.json();
                console.log(commentData, 'this was logged')


                const {
                  id,
                  userId,
                  firstName,
                  updatedAt,
                } = commentData

          const editBtn = document.createElement('button');
          editBtn.setAttribute('value', id)
          editBtn.className += `editBtn-${id}`;
          editBtn.className += 'btn';
          editBtn.className += 'editBtn';
          editBtn.innerText = 'Edit'


          editBtn.forEach(btns => {
            btns.addEventListener("click", event => {
              const commentBody = event.target.parentElement.previousSibling.previousSibling
                  event.target.hidden= true
                  event.target.nextSibling.hidden= true
                  event.target.nextSibling.nextSibling.hidden= false
                  event.target.nextSibling.nextSibling.nextSibling.hidden= false
                  commentBody.setAttribute("contenteditable","true")
                  event.preventDefault()
            })
            })



          const deleteBtn = document.createElement('button');
          deleteBtn.setAttribute('value', id)
          deleteBtn.className += `deleteBtn-${id}`;
          deleteBtn.className += 'btn';
          deleteBtn.className += 'deleteBtn';
          deleteBtn.innerText = 'Delete'




            deleteBtn.addEventListener("click", event => {
              const commentBody = event.target.parentElement.previousSibling.previousSibling
              event.target.hidden= true
              event.target.nextSibling.hidden= true
              event.target.nextSibling.nextSibling.hidden= false
              event.target.nextSibling.nextSibling.nextSibling.hidden= false
              commentBody.setAttribute("contenteditable","false")
              event.preventDefault()

            })

          //--------------------------------------------------------------------
          const commentUserInfo = document.createElement("div")
          commentUserInfo.classList.add('commentUserInfo')
          commentUserInfo.appendChild(newDivArea)

          const commentButtons = document.createElement("div")
          commentButtons.classList.add('commentButtons');

          const commentContent = document.createElement("div")
          commentContent.classList.add('commentContent');

          commentButtons.appendChild(commentContent);
          commentList.appendChild(commentContent)
          //---------------------------------------------------------------------
          const editCancelBtn = document.createElement('button');
          editCancelBtn.setAttribute('value', id)
          editCancelBtn.className += `editCancelBtn-${id}`;
          editCancelBtn.className += 'btn';
          editCancelBtn.className += 'editCancelBtn';
          editCancelBtn.innerText = 'Cancel'


            editCancelBtn.addEventListener("click", event => {
              const commentBody = event.target.parentElement.previousSibling.previousSibling
              event.target.hidden= true
              event.target.nextSibling.hidden= true
              event.target.previousSibling.hidden= false
              event.target.previousSibling.previousSibling.hidden= false
              commentBody.setAttribute("contenteditable","false")
              event.preventDefault()
            })



          const editSubmitBtn = document.createElement('button');
          editSubmitBtn.setAttribute('value', id)
          editSubmitBtn.className += `editSubmitBtn-${id}`;
          editSubmitBtn.className += 'btn';
          editSubmitBtn.className += 'editSubmitBtn';
          editSubmitBtn.innerText = 'Submit'


            editSubmitBtn.addEventListener("click", event => {
              const commentBody = event.target.parentElement.previousSibling.previousSibling
              event.target.hidden= true
              event.target.previousSibling.hidden= true
              event.target.previousSibling.previousSibling.hidden= false
              event.target.previousSibling.previousSibling.previousSibling.hidden= false
              commentBody.setAttribute("contenteditable","false")
              event.preventDefault()
            })



          commentButtons.appendChild(editBtn);
          commentButtons.appendChild(deleteBtn);
          commentButtons.appendChild(editCancelBtn);
          editCancelBtn.hidden= true
          commentButtons.appendChild(editSubmitBtn);
          editSubmitBtn.hidden= true

        } catch (e) {
          console.log("Failed to fetch comments", e);
        }
      });
    }
  })
