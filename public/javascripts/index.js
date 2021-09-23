window.addEventListener("DOMContentLoaded", async (event) =>{
    const commentList = document.querySelector('.commentList')
    const commentBtn = document.querySelector('#submitBtn')

    // Event Listner for PUG edit button
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
    //---------------------------------------------------------------------------------------------------------------

    // Event Listner for PUG delete button
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
    //---------------------------------------------------------------------------------------------------------------

    // Event Listner for PUG  eidt cancel button
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
    //---------------------------------------------------------------------------------------------------------------

    // Event Listner for PUG edit submit button
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
    //---------------------------------------------------------------------------------------------------------------


    if (commentBtn) {
      commentBtn.addEventListener("click", async event => {

        event.preventDefault();
        const _csrf = document.querySelector('#token').value;
        
        const commentBody = document.createElement('div');
        commentBody.classList.add('commentBody');

        const userInput = document.querySelector('.form-control').value
        commentBody.innerText = userInput;
        document.querySelector('.form-control').value = '';

        
        
        
        
        
        const storyId = event.target.dataset.storyId;
        const body = { body: userInput, _csrf }
        try {
                const commentResponse = await fetch(`/stories/${storyId}/comments`, {
                  method: "POST",
                  body: JSON.stringify(body),
                  headers: { "Content-Type": "application/json" },
                });

                // Converts to JSON
                const commentData = await commentResponse.json();


                const {
                  id,
                  userId,
                  firstName,
                  updatedAt,
                } = commentData
          
          //Creating Edit buttton      
          const editBtn = document.createElement('button');
          editBtn.setAttribute('value', id)
          editBtn.className += `editBtn-${id}`;
          editBtn.className += 'btn';
          editBtn.className += 'editBtn';
          editBtn.innerText = 'Edit'
          //-------------------------------------------------------
          //Creating delete button
          const deleteBtn = document.createElement('button');
          deleteBtn.setAttribute('value', id)
          deleteBtn.className += `deleteBtn-${id}`;
          deleteBtn.className += 'btn';
          deleteBtn.className += 'deleteBtn';
          deleteBtn.innerText = 'Delete'
          //-------------------------------------------------------
          //Creating edit cancel button
          const editCancelBtn = document.createElement('button');
          editCancelBtn.setAttribute('value', id)
          editCancelBtn.className += `editCancelBtn-${id}`;
          editCancelBtn.className += 'btn';
          editCancelBtn.className += 'editCancelBtn';
          editCancelBtn.innerText = 'Cancel'
          //-------------------------------------------------------
          //Creating edit submit button
          const editSubmitBtn = document.createElement('button');
          editSubmitBtn.setAttribute('value', id)
          editSubmitBtn.className += `editSubmitBtn-${id}`;
          editSubmitBtn.className += 'btn';
          editSubmitBtn.className += 'editSubmitBtn';
          editSubmitBtn.innerText = 'Submit'
          //-------------------------------------------------------
         
          //Create
          const commentPost = document.createElement('div');
          commentPost.className += `comment-${id}`;     


          const commenterInfo = document.createElement("div")
          commenterInfo.classList.add('commenterInfo')
          
          const commentButtons = document.createElement("div")
          commentButtons.classList.add('commentButtons');
          
          const commentContent = document.createElement("div")
          commentContent.classList.add('commentContent');
          
          
          // EventListener for edit button
          
          editBtn.addEventListener("click", event => {
              const commentBody = event.target.parentElement.previousSibling.previousSibling
                  event.target.hidden= true
                  event.target.nextSibling.hidden= true
                  event.target.nextSibling.nextSibling.hidden= false
                  event.target.nextSibling.nextSibling.nextSibling.hidden= false
                  commentBody.setAttribute("contenteditable","true")
                  event.preventDefault()
            })
            
          //-------------------------------------------------------
          
          // Event Listner for delete button  
          deleteBtn.addEventListener("click", event => {
              const commentBody = event.target.parentElement.previousSibling.previousSibling
              event.target.hidden= true
              event.target.nextSibling.hidden= true
              event.target.nextSibling.nextSibling.hidden= false
              event.target.nextSibling.nextSibling.nextSibling.hidden= false
              commentBody.setAttribute("contenteditable","false")
              event.preventDefault()
              
            })
            //-------------------------------------------------------
            // Event Listner for edit cancel button  
            editCancelBtn.addEventListener("click", event => {
              const commentBody = event.target.parentElement.previousSibling.previousSibling
              event.target.hidden= true
              event.target.nextSibling.hidden= true
              event.target.previousSibling.hidden= false
              event.target.previousSibling.previousSibling.hidden= false
              commentBody.setAttribute("contenteditable","false")
              event.preventDefault()
            })
            //-------------------------------------------------------
            
            // Event Listner for edit submit button  
            editSubmitBtn.addEventListener("click", event => {
              const commentBody = event.target.parentElement.previousSibling.previousSibling
              event.target.hidden= true
              event.target.previousSibling.hidden= true
              event.target.previousSibling.previousSibling.hidden= false
              event.target.previousSibling.previousSibling.previousSibling.hidden= false
              commentBody.setAttribute("contenteditable","false")
              event.preventDefault()
            })
            
            
            
            
            //--------------------------------------------------------------------
            
            
            commentBody.appendChild(commentButtons)
            // Appending buttong to the users input text
            commentButtons.appendChild(commentContent);
            // Appending the the users text input to user info
            commenterInfo.appendChild(commentBody);
            // Appending the users info to the comment object
            commentPost.appendChild(commenterInfo)
            // Appending comment to the list of comments
            commentList.appendChild(commentPost);
            //---------------------------------------------------------------------
            // Appending buttons to comment button div
            commentButtons.appendChild(editBtn);
            commentButtons.appendChild(deleteBtn);
            commentButtons.appendChild(editCancelBtn);
            commentButtons.appendChild(editSubmitBtn);
            //---------------------------------------------------------------------
            

            editCancelBtn.hidden= true
            editSubmitBtn.hidden= true
            
            
            






        } catch (e) {
          console.log("Failed to fetch comments", e);
        }
      });
    }
  })
