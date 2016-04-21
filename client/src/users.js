window.onload = function() {
    document.getElementById('show').onclick = function() {
        window.location = '?period=' + document.getElementById('period').value;
    };
};