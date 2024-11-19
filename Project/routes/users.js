const express = require('express');
const router = express.Router();
const con = require('./db');

/* GET users listing. */

router.get('/cart', function(req, res, next) {
    let total = 0;
    if (!req.session.loggedin) {
        res.redirect('/login');
    }
    con.query("SELECT * FROM cart WHERE user_id=?", [req.session.userid], function(err, result) {
        if (err) {
            console.log(err);
            return;
        }

        for (let i = 0; i < result.length; i++) {
            total += result[i].product_price;
        }


        res.render('cart', { cart: result, total: total });
    })
});

router.get('/insertcart/:id', function(req, res, next) {
    const id = req.params.id;
    if (!req.session.loggedin) {
        res.redirect('/login');
    }

    con.query("SELECT * FROM product WHERE id=?", [id], function(err, result) {
        if (err) {
            console.log(err);
            return;
        }
        con.query("INSERT INTO cart (user_id, product_id, product_name, product_price, product_img) VALUES (?, ?, ?, ?, ?)", [req.session.userid, id, result[0].name, result[0].price, result[0].image], function(err, result) {
            if (err) {

                console.log(err);
                return;
            }
            res.redirect('/cart');
        });
    });

});

router.get('/deletecart/:id', function(req, res, next) {
    const id = req.params.id;
    if (!req.session.loggedin) {
        res.redirect('/login');
    }

    con.query("DELETE FROM cart WHERE id=?", [id], function(err, result) {
        if (err) {
            console.log(err);
            return;
        }
        res.redirect('/cart');
    });
});

router.get('/add_amount/:id', function(req, res, next) {
    const id = req.params.id;
    if (!req.session.loggedin) {
        res.redirect('/login');
    }

    con.query("SELECT * FROM cart WHERE id=?", [id], function(err, result) {
        if (err) {
            console.log(err);
            return;
        }
        con.query("UPDATE cart SET product_amount = product_amount + 1 WHERE id=?", [id], function(err, result) {
            if (err) {
                console.log(err);
                return;
            }
            res.send('success');
        });
    });

});

router.get('/minus_amount/:id', function(req, res, next) {
    const id = req.params.id;
    if (!req.session.loggedin) {
        res.redirect('/login');
    }

    con.query("SELECT * FROM cart WHERE id=?", [id], function(err, result) {
        if (err) {
            console.log(err);
            return;
        }
        con.query("UPDATE cart SET product_amount = product_amount - 1 WHERE id=?", [id], function(err, result) {
            if (err) {
                console.log(err);
                return;
            }
            res.send('success');
        });
    });

});


router.get('/profile', function(req, res, next) {
    let username = req.session.username;
    let urole = req.session.urole;
    if (!req.session.loggedin) {
        res.redirect('/login');
    }
    con.query("SELECT * FROM users WHERE id=?", [req.session.userid], function(err, result) {
        if (err) {

            console.log(err);
            return;
        }
        if (req.session.message == null) {
            req.session.message = "";
        }
        res.render('pages/user/profile', { username: username, urole: urole, user: result[0], message: req.session.message });
    });
});

router.post('/updateprofile', function(req, res, next) {
    if (!req.session.loggedin) {
        res.redirect('/login');
    }
    con.query("UPDATE users SET email=?, username=?, password=? WHERE id=?", [req.body.email, req.body.username, req.body.password, req.session.userid], function(err, result) {
        if (err) {
            console.log(err);
            return;
        }
        req.session.username = req.body.username;
        req.session.message = "Profile updated successfully";
        res.redirect('/profile');
        req.session.message = "";
    });
});


router.post('/mix_and_match', function(req, res, next) {
    if (!req.session.loggedin) {
        res.redirect('/login');
    }
    con.query("INSERT INTO mix_and_match (user_id, product_id, product_name, product_price, product_img) VALUES (?, ?, ?, ?, ?)", [req.session.userid, req.body.product_id, req.body.product_name, req.body.product_price, req.body.product_img], function(err, result) {
        if (err) {
            console.log(err);
            return;
        }
        res.redirect('/save_mix_and_match');
    });
});

router.get('/save_mix_and_match', function(req, res, next) {
    if (!req.session.loggedin) {
        res.redirect('/login');
    }
    let username = req.session.username;
    let urole = req.session.urole;
    con.query("SELECT * FROM mix_and_match WHERE user_id=? AND name IS NULL", [req.session.userid], function(err, result) {
        if (err) {
            console.log(err);
            return;
        }
        if (req.session.message == null) {
            req.session.message = "";
        }
        res.render('pages/user/save_mix_and_match', { username: username, urole: urole, mix_and_match: result, message: req.session.message });
        req.session.message = "";
    });
});

const check_name = async(name) => {
    return new Promise((resolve, reject) => {
        con.query("SELECT * FROM mix_and_match WHERE name=?", [name], function(err, result) {
            if (err) {
                console.log(err);
                return;
            }
            if (result.length > 0) {
                resolve(true);
            } else {
                resolve(false);
            }
        });
    });
}

router.post('/save_mix_and_match', async function(req, res, next) {
    if (!req.session.loggedin) {
        res.redirect('/login');
    }
    let check = await check_name(req.body.name);
    if (check == false) {
        con.query("SELECT * FROM mix_and_match WHERE user_id=? AND name IS NULL", [req.session.userid], function(err, result) {
            if (err) {
                console.log(err);
                return;
            }
            for (const i = 0; i < result.length; i++) {
                con.query("UPDATE mix_and_match SET name=? WHERE id=?", [req.body.name, result[i].id], function(err, result) {
                    if (err) {
                        console.log(err);
                        return;
                    }
                });
            }
            req.session.message = "Mix and match saved successfully";
            res.redirect('/save_mix_and_match');
            req.session.message = "";
        });
    } else {
        req.session.message = "Mix and match name already exists";
        res.redirect('/save_mix_and_match');
        req.session.message = "";
    }
});


router.get('/delete-product-mix/:id', function(req, res, next) {
    const id = req.params.id;
    if (!req.session.loggedin) {
        res.redirect('/login');
    }

    con.query("DELETE FROM mix_and_match WHERE id=?", [id], function(err, result) {
        if (err) {
            console.log(err);
            return;
        }
        res.redirect('/save_mix_and_match');
    });
});

router.get('/delete-product-mix_from_save/:id', function(req, res, next) {
    const id = req.params.id;
    if (!req.session.loggedin) {
        res.redirect('/login');
    }

    con.query("DELETE FROM mix_and_match WHERE id=?", [id], function(err, result) {
        if (err) {
            console.log(err);
            return;
        }
        req.session.message = "Product deleted successfully";
        res.redirect('/mixandmatch');
        req.session.message = "";
    });
});


router.get('/mixandmatch', function(req, res, next) {
    if (!req.session.loggedin) {
        res.redirect('/login');
        return;
    }

    let username = req.session.username;
    let urole = req.session.urole;
    con.query("SELECT name FROM mix_and_match WHERE name IS NOT NULL AND user_id=?", [req.session.userid], function(err, result) {
        if (err) {
            console.log(err);
            return;
        }
        if (req.session.message == null) {
            req.session.message = "";
        }
        let list_name = [];
        for (const i = 0; i < result.length; i++) {
            if (list_name.indexOf(result[i].name) == -1) {
                list_name.push(result[i].name);
            }
        }
        let message = req.session.message;
        req.session.message = "";
        res.render('pages/user/mixandmatch', { username: username, urole: urole, mix_and_match: list_name, message: message });

    });
});

router.get('/mixandmatch/:name', function(req, res, next) {
    if (!req.session.loggedin) {
        res.redirect('/login');
        return;
    }

    let username = req.session.username;
    let urole = req.session.urole;
    con.query("SELECT * FROM mix_and_match WHERE name=?", [req.params.name], function(err, result) {
        if (err) {
            console.log(err);
            return;
        }
        if (req.session.message == null) {
            req.session.message = "";
        }
        let message = req.session.message;
        req.session.message = "";
        res.render('pages/user/edit_mixandmatch', { username: username, urole: urole, mix_and_match: result, message: message });
    });
});


router.get('/delete-mixandmatch/:name', function(req, res, next) {
    const name = req.params.name;
    if (!req.session.loggedin) {
        res.redirect('/login');
    }

    con.query("DELETE FROM mix_and_match WHERE name=?", [name], function(err, result) {
        if (err) {
            console.log(err);
            return;
        }
        req.session.message = "Mix and match deleted successfully";
        res.redirect('/mixandmatch');
    });
});




module.exports = router;