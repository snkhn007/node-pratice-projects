const addReqHandler = require('./addReqHandler');
const requestHandler = (req, res)=>{
    const url = req.url.toLowerCase();
    res.setHeader('Content-Type', 'text/html');

    if(url === '/' && req.method === 'GET'){
        res.write(`<h2>Welcome</h2>
        <a href="/calc-page">Click Me To Start Calculating</a>`);
        return res.end();
    }
    
    else if(url === '/home' && req.method === 'GET'){
        res.statusCode = 302;
        res.setHeader('Location', '/');
        console.log('redirecting...');
        return res.end();
    }
    
    else if(url === '/calc-page' && req.method === 'GET'){
        res.write(`<form action="/calc-res" method="POST">
            <label>
                <input type="text" name="num1" id="num1" placeholder="Enter number">
            </label>
            <br><br>
            <label>
                <input type="text" name="num2" id="num2" placeholder="Enter number">
            </label>
            <br><br>
            <button type="submit">Submit</button>
        </form>`);
        return res.end();
    }
    
    else if(url === '/calc-res' && req.method === 'POST'){
        // parsing ->
        const body =[];
        req.on('data', (chunks)=>{
            body.push(chunks);
        })
        req.on('end', ()=>{
            const parsed = Buffer.concat(body).toString(); // "num1=2&num2=3"
            const params = new URLSearchParams(parsed);
            const jsonObj = {};
            for (const[key, val] of params.entries()){
                jsonObj[key] = val; // { num1: '2', num2: '3' }
            }

            const num1 = Number(jsonObj.num1);
            const num2 = Number(jsonObj.num2);

            if(Number.isNaN(num1) || Number.isNaN(num2)){
                res.statusCode = 400;
                res.write(`<p>invalid input</p>`);
                return res.end();
            }

            const sum = addReqHandler(num1, num2);

            res.write(`<p>Result: ${sum}</p>`);
            console.log(num1, num2);
            return res.end();
        })
    }else{
        res.write('invalid');
        return res.end()
    }
};

module.exports = requestHandler;