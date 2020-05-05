function fixPos() {
    let footer = document.getElementById('footer');

    if (footer.scrollTop !== (footer.scrollHeight - footer.offsetHeight)) {
        footer.classList.add('noScroll');
    }
}