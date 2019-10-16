
const serverRequest = {

    request: async function (url, body) {
        try {

            let res = await fetch(process.env.REACT_APP_SRV_PATH + url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'token': localStorage.getItem('token')
                },
                body: JSON.stringify(body)
            });

            if (res.status === 200) {
                return await res.json();
            }
            else if (res.status === 401) {
                window.location.href = '#/401';
                return false;
            }
            else {
                let msgErro = await res.text();
                alert(`${res.status}: ${msgErro}`);
                return false;
            }

        } catch (err) {
            alert('Erro de conexão com o servidor');
            return false;
        }
    },

    requestForm: async function (url, data) {
        try {

            let res = await fetch(process.env.REACT_APP_SRV_PATH + url, {
                method: 'POST',
                headers: {
                    'token': localStorage.getItem('token')
                },
                body: data
            });

            if (res.status === 200) {
                return await res.json();
            }
            else if (res.status === 401) {
                window.location.href = '#/401';
                return false;
            }
            else {
                let msgErro = await res.text();
                alert(`${res.status}: ${msgErro}`);
                return false;
            }

        } catch (err) {
            alert('Erro de conexão com o servidor');
            return false;
        }
    }
}

export default serverRequest;
