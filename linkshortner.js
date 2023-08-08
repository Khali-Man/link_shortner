const mobileHeader = document.getElementById('mobile-header')
const imgContain = document.querySelector('.imgcontain')
const inputUrl = document.getElementById('input')
const searchBtn = document.getElementById('searchBtn')
const shortLinkDivs = document.getElementById('div-to-append')
const errorMessage = document.getElementById('error-msg')
const copyBtn = document.querySelector('.copyurl')
const clearBtn = document.getElementById('clear-btn')

const dropdown = () => {
    console.log('hi')
    if(mobileHeader.style.display === 'none') {
        mobileHeader.style.display = 'flex'
    }
    else {
        mobileHeader.style.display = 'none'
    }
}
imgContain.addEventListener('click', dropdown)


let url = ''
searchBtn.addEventListener('click', () => {
    url = inputUrl.value
    clearBtn.style.display = 'block'
    fetch(`https://api.shrtco.de/v2/shorten?url=${url}`)
        .then(response => response.json())
        .then(json => {
            inputUrl.style.color = 'black'
            errorMessage.innerText = ''
            inputUrl.style.border = 'none'
            inputUrl.classList.remove('error')
            shortLinkDivs.innerHTML += `
            <div class="linkappend">
                <a class="inputlink" href="${url}">${url}</a>
                <div class="shortlink">
                    <a class="link" href="${json.result.full_short_link}">${json.result.full_short_link}</a>
                    <button class="copyurl" id="${json.result.full_short_link}" onclick="onclickFunc()">Copy</button>
                </div>
            </div>`
        })
        .catch(error => {
            errorMessage.innerText = 'invalid link!'
            inputUrl.style.borderWidth = '2px'
            inputUrl.style.borderColor = 'red'
            inputUrl.style.borderStyle = 'solid'
            inputUrl.style.color = 'red'
            inputUrl.classList.add('error')
        })
})

const copyContent = async (id) => {
    try {
        await navigator.clipboard.writeText(id)
        return id
    }
    catch (err) {
        return err
    }
}

const onclickFunc = () => {
    const urlBtns = document.querySelectorAll('.copyurl')
    urlBtns.forEach(button => {
        button.addEventListener('click', function() {
            copyContent(this.id)
            .then((data) => {
                this.style.backgroundColor = 'hsl(257, 27%, 26%)'
                this.innerHTML = 'copied'
            })
        })
    })

}
const clearAll = () => {
    shortLinkDivs.innerHTML = '';
    if(shortLinkDivs.innerHTML === '') {
        clearBtn.style.display = 'none'
    }
}
