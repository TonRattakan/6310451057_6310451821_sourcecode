const express = require('express');

const router = express.Router();
const con = require('./db');

/* GET home page. */

const get_product_by_id = (id) => {
    return new Promise((resolve, reject) => {
        con.query("SELECT * FROM product WHERE id=?", [id], function(err, result) {
            if (err) {
                console.log(err);
                return;
            }
            resolve(result[0]);
        });
    });
}

const get_mix_and_match = (colorScheme, type) => {
    return new Promise((resolve, reject) => {
        let colorSchemes = {
            "ดำ": ["ดำ", "ครีม", "ขาว", "เทา", "น้ำตาลอ่อน", "เทาเข้ม"],
            "แดง": ["ขาว", "ครีม", "ชมพู"],
            "เขียว": ["ขาว", "ครีม", "เหลือง"],
            "เหลือง": ["ขาว", "ครีม", "เขียว"],
            "ม่วง": ["ขาว", "ชมพู", "ครีม", "ฟ้า"],
            "น้ำเงิน": ["ขาว", "ชมพู", "ครีม", "ฟ้า"],
            "ฟ้า": ["ขาว", "ชมพู", "ครีม", "น้ำเงิน"],
            "ชมพู": ["ขาว", "แดง", "ครีม", "ฟ้า"],
            "ขาว": ["ขาว", "ชมพู", "ครีม", "ฟ้า", "น้ำตาลอ่อน", "น้ำเงิน", "เทา"],
            "น้ำตาลอ่อน": ["ขาว", "ครีม", "ดำ"],
            "กรม": ["ครีม", "ดำ", "ขาว"],
            "เทา": ["ขาว", "ดำ", "ครีม"],
            "เขียวขี้ม้า": ["ดำ", "น้ำตาล", "ครีม", "เทา"],
            "เทาเข้ม": ["ดำ", "ครีม", "น้ำตาล"],
            "น้ำตาล": ["ขาว", "ดำ", "ครีม", "เขียวขี้ม้า"],
            "ครีม": ["น้ำตาลอ่อน", "เทา", "ขาว", "ดำ"],
            "ส้ม": ["ขาว", "ดำ", "ครีม"]
        };

        if (colorScheme in colorSchemes) {
            let validColors = colorSchemes[colorScheme];
            con.query("SELECT * FROM product WHERE NOT type=? AND color_scheme IN (?) ORDER BY RAND() LIMIT 4", [type, validColors], function (err, result) {
                if (err) {
                    console.log(err);
                    reject(err);
                } else {
                    resolve(result);
                }
            });
        } else {
            resolve("");
        }
    });
};

router.get('/', function(req, res, next) {
    if (req.session.loggedin) {
        let username = req.session.username;
        let urole = req.session.urole;
        con.query("SELECT * FROM product", function(err, result) {
            if (err) {
                console.log(err);
                return;
            }
            con.query("SELECT * FROM type_of_fabric", function(err, result1) {
                if (err) {
                    console.log(err);
                    return;
                }
                con.query("SELECT * FROM category", function(err, result2) {
                    if (err) {
                        console.log(err);
                        return;
                    }
                    res.render('index', { username: username, urole: urole, products: result, type_of_fabric: result1, category: result2 });
                });
            });
        });
    } else {
        con.query("SELECT * FROM product", function(err, result) {
            if (err) {
                console.log(err);
                return;
            }
            con.query("SELECT * FROM type_of_fabric", function(err, result1) {
                if (err) {
                    console.log(err);
                    return;
                }
                con.query("SELECT * FROM category", function(err, result2) {
                    if (err) {
                        console.log(err);
                        return;
                    }
                    res.render('index', { username: '', urole: '', products: result, type_of_fabric: result1, category: result2 });
                });
            });
        });
    }
});

router.get('/search', function(req, res, next) {
    let search = req.query.search;
    con.query("SELECT * FROM product WHERE name LIKE '%" + search + "%'", function(err, result) {
        if (err) {
            console.log(err);
            return;
        }
        if (req.session.loggedin) {
            let username = req.session.username;
            let urole = req.session.urole;
            res.render('search', { username: username, urole: urole, products: result });
        } else {
            res.render('search', { username: '', urole: '', products: result });
        }
    });
});


router.get('/login', function(req, res, next) {
    if (req.session.loggedin) {
        res.redirect('/');
    }

    res.render('login', { username: '', message: '', urole: '' });
});

router.post('/login', function(req, res, next) {
    const username = req.body.username;
    const password = req.body.password;

    con.query("SELECT * FROM users WHERE username = '" + username + "' AND password = '" + password + "'", function(err, result) {
        if (err) {
            console.log(err);
            return;
        }
        if (result.length > 0) {
            req.session.loggedin = true;
            req.session.username = result[0].username;
            req.session.urole = result[0].urole;
            req.session.userid = result[0].id;
            res.redirect('/');
        } else {
            res.render('login', { message: 'Invalid username or password', username: '', urole: '' });
        }
    });
});

router.get('/contact', function(req, res, next) {
    if (req.session.loggedin) {
        let username = req.session.username;
        let urole = req.session.urole;
        res.render('contact', { username: username, urole: urole });
    } else {
        res.render('contact', { username: '', urole: '' });
    }
});

router.get('/register', function(req, res, next) {
    if (req.session.loggedin) {
        res.redirect('/');
    }
    res.render('register', { username: '' });
});

router.post('/register', function(req, res, next) {
    const username = req.body.username;
    const email = req.body.email;
    const password = req.body.password;
    const password2 = req.body.password_c;

    if (password == password2) {
        con.query("INSERT INTO users (username, email, password, urole) VALUES ('" + username + "', '" + email + "', '" + password + "', 'user')", function(err, result) {
            if (err) {
                console.log(err);
                return;
            }
            console.log("1 record inserted");
        });
        res.redirect('/login');
    }
});

router.get('/logout', (req, res) => {
    req.session = null;
    res.redirect('/');
});

router.get('/product/:id', async function(req, res, next) {
    if (req.session.loggedin) {
        let username = req.session.username;
        let urole = req.session.urole;

        con.query("SELECT * FROM product WHERE id = '" + req.params.id + "'", async function(err, result) {
            if (err) {
                console.log(err);
                return;
            }
            const mix_and_match = await get_mix_and_match(result[0].color_scheme, result[0].type);
            console.log(mix_and_match);
            con.query("SELECT * FROM type_of_fabric", function(err, result1) {
                if (err) {
                    console.log(err);
                    return;
                }
                con.query("SELECT * FROM category", function(err, result2) {
                    if (err) {
                        console.log(err);
                        return;
                    }
                    res.render('product', { username: username, urole: urole, products: result, type_of_fabric: result1, category: result2, mix_and_match: mix_and_match });
                });
            });
        });
    } else {
        con.query("SELECT * FROM product WHERE id = '" + req.params.id + "'", async function(err, result) {
            if (err) {
                console.log(err);
                return;
            }
            const mix_and_match = await get_mix_and_match(result[0].color_scheme, result[0].type);
            console.log(mix_and_match);
            con.query("SELECT * FROM type_of_fabric", function(err, result1) {
                if (err) {
                    console.log(err);
                    return;
                }
                con.query("SELECT * FROM category", function(err, result2) {
                    if (err) {
                        console.log(err);
                        return;
                    }
                    res.render('product', { username: '', urole: '', products: result, type_of_fabric: result1, category: result2, mix_and_match: mix_and_match });
                });
            });
        });
    }
});




module.exports = router;