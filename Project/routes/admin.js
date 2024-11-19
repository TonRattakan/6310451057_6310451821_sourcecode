const express = require('express');
const router = express.Router();
const con = require('./db');
const multer = require('multer');
const fs = require('fs');
const path = require('path');

const get_product_with_id = async(id) => {
    return await new Promise((resolve, reject) => {
        con.query("SELECT * FROM product WHERE id=?", [id], function(err, result) {
            if (err) {
                console.log(err);
                return;
            }
            resolve(result);
        });
    });
}

const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, './public/images/uploads');
    },
    filename: function(req, file, cb) {
        cb(null, Date.now() + file.originalname)
    }
})

const upload = multer({ storage: storage })

const colors = ['แดง', 'ส้ม', 'กรม', 'เหลือง', 'ครีม', 'น้ำตาล', 'เขียว', 'ม่วง', 'น้ำเงิน', 'ฟ้า', 'ชมพู', 'ดำ', 'เขียวขี้ม้า', 'เทาเข้ม', 'เทา', 'ขาว', 'น้ำตาลอ่อน'];
const tones = ['สดใส', 'เข้ม', 'อ่อน'];

router.get('/dashboard', function(req, res, next) {
    if (req.session.loggedin) {
        let username = req.session.username;
        let urole = req.session.urole;
        if (urole !== 'admin') {
            res.redirect('/');
            return;
        }
        res.redirect('/products');
    } else {
        res.redirect('/');
        return;
    }
});

router.get('/edit-product/:id', async function(req, res, next) {
    if (req.session.loggedin) {
        let username = req.session.username;
        let urole = req.session.urole;
        if (urole !== 'admin') {
            res.redirect('/');
            return;
        }

        let id = req.params.id;

        const product = await get_product_with_id(id);

        con.query("SELECT * FROM category", function(err, category) {
            if (err) {
                console.log(err);
                return;
            }
            con.query("SELECT * FROM type", function(err, types) {
                if (err) {
                    console.log(err);
                    return;
                }
                con.query("SELECT * FROM type_of_fabric", function(err, fabric) {
                    if (err) {
                        console.log(err);
                        return;
                    }
                    res.render('pages/admin/edit-product', { username: username, urole: urole, categories: category, types: types, fabrics: fabric, product: product });
                });

            });
        });

    } else {
        res.redirect('/');
        return;
    }
});

router.post('/edit-product/:id', async function(req, res, next) {
    if (req.session.loggedin) {
        let username = req.session.username;
        let urole = req.session.urole;
        if (urole !== 'admin') {
            res.redirect('/');
            return;
        }

        let id = req.params.id;
        // update product
        let name = req.body.name;
        let price = req.body.price;
        let description = req.body.description;
        let category = req.body.category;
        let type = req.body.type;
        let fabric = req.body.fabric;
        con.query("UPDATE product SET name=?, price=?, description=?, category=?, type=?, type_of_fabric=? WHERE id=?", [name, price, description, category, type, fabric, id], function(err, result) {
            if (err) {
                console.log(err);
                return;
            }
            res.redirect('/products');
        });

    } else {
        res.redirect('/');
        return;
    }
});


router.get('/add-product', function(req, res, next) {
    if (req.session.loggedin) {
        let username = req.session.username;
        let urole = req.session.urole;
        if (urole !== 'admin') {
            res.redirect('/');
            return;
        }

        con.query("SELECT * FROM category", function(err, category) {
            if (err) {
                console.log(err);
                return;
            }
            con.query("SELECT * FROM type", function(err, types) {
                if (err) {
                    console.log(err);
                    return;
                }
                con.query("SELECT * FROM type_of_fabric", function(err, fabric) {
                    if (err) {
                        console.log(err);
                        return;
                    }
                    res.render('pages/admin/add-product', { username: username, urole: urole, categories: category, types: types, fabrics: fabric });
                });

            });
        });

    } else {
        res.redirect('/');
        return;
    }
});

router.post('/add-product', upload.single('file'), function(req, res, next) {
    try {
        if (req.session.loggedin) {
            let urole = req.session.urole;
            if (urole !== 'admin') {
                res.redirect('/');
                return;
            }

            let sex = req.body.sex;
            let name = req.body.name;
            let price = req.body.price;
            let description = req.body.description;
            let category = req.body.category;
            let type = req.body.type;
            let fabric = req.body.fabric;
            let image = "/images/uploads/" + req.file.filename;
            let color = req.body.color;
            let color_scheme = req.body.color_scheme;

            con.query("INSERT INTO product (name, price, description, category, type, type_of_fabric, image, color, color_scheme, sex) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)", [name, price, description, category, type, fabric, image, color, color_scheme, sex], function(err, result) {
                if (err) {
                    console.log(err);
                    return;
                } else {
                    res.redirect('/products');
                    return;
                }
            });

        } else {
            res.redirect('/');
            return;
        }
    } catch (error) {
        console.log(error);
    }
});

router.get('/products', function(req, res, next) {
    if (req.session.loggedin) {
        let username = req.session.username;
        let urole = req.session.urole;
        if (urole !== 'admin') {
            res.redirect('/');
            return;
        }

        con.query("SELECT * FROM product", function(err, result) {
            if (err) {
                console.log(err);
                return;
            }
            res.render('pages/admin/products', { username: username, urole: urole, products: result });
        });
    } else {
        res.redirect('/');
        return;
    }
});


router.get('/category', function(req, res, next) {
    if (req.session.loggedin) {
        let username = req.session.username;
        let urole = req.session.urole;
        if (urole !== 'admin') {
            res.redirect('/');
            return;
        }

        con.query("SELECT * FROM category", function(err, result) {
            if (err) {
                console.log(err);
                return;
            }
            res.render('pages/admin/category', { username: username, urole: urole, categories: result });
        });
    } else {
        res.redirect('/');
        return;
    }
});

router.post('/category', function(req, res, next) {
    if (req.session.loggedin) {
        let username = req.session.username;
        let urole = req.session.urole;
        if (urole !== 'admin') {
            res.redirect('/');
            return;
        }

        let category = req.body.name;
        con.query("INSERT INTO category (name) VALUES ('" + category + "')", function(err, result) {
            if (err) {
                console.log(err);
                return;
            }
            res.redirect('/category');
        });
    } else {
        res.redirect('/');
        return;
    }
});

router.get('/delete-category/:id', function(req, res, next) {
    if (req.session.loggedin) {
        let username = req.session.username;
        let urole = req.session.urole;
        if (urole !== 'admin') {
            res.redirect('/');
            return;
        }

        let id = req.params.id;
        con.query("DELETE FROM category WHERE id = '" + id + "'", function(err, result) {
            if (err) {
                console.log(err);
                return;
            }
            res.redirect('/category');
        });
    } else {
        res.redirect('/');
        return;
    }
});

router.get('/type', function(req, res, next) {
    if (req.session.loggedin) {
        let username = req.session.username;
        let urole = req.session.urole;
        if (urole !== 'admin') {
            res.redirect('/');
            return;
        }
        con.query("SELECT * FROM type", function(err, result) {
            if (err) {
                console.log(err);
                return;
            }
            res.render('pages/admin/type', { username: username, urole: urole, types: result });
        });
    } else {
        res.redirect('/');
        return;
    }
});

router.post('/type', function(req, res, next) {
    if (req.session.loggedin) {
        let username = req.session.username;
        let urole = req.session.urole;
        if (urole !== 'admin') {
            res.redirect('/');
            return;
        }
        con.query("INSERT INTO type (name) VALUES ('" + req.body.name + "')", function(err, result) {
            if (err) {
                console.log(err);
                return;
            }
            res.redirect('/type');
        });
    } else {
        res.redirect('/');
        return;
    }
});


router.get('/delete-type/:id', function(req, res, next) {
    if (req.session.loggedin) {
        let username = req.session.username;
        let urole = req.session.urole;
        if (urole !== 'admin') {
            res.redirect('/');
            return;
        }

        let id = req.params.id;
        con.query("DELETE FROM type WHERE id = '" + id + "'", function(err, result) {
            if (err) {
                console.log(err);
                return;
            }
            res.redirect('/type');
        });
    } else {
        res.redirect('/');
        return;
    }
});

router.get('/fabric', function(req, res, next) {
    if (req.session.loggedin) {
        let username = req.session.username;
        let urole = req.session.urole;
        if (urole !== 'admin') {
            res.redirect('/');
            return;
        }
        con.query("SELECT * FROM type_of_fabric", function(err, result) {
            if (err) {
                console.log(err);
                return;
            }
            res.render('pages/admin/type_of_fabric', { username: username, urole: urole, fabrics: result });
        });
    } else {
        res.redirect('/');
        return;
    }
});

router.post('/fabric', function(req, res, next) {
    if (req.session.loggedin) {
        let username = req.session.username;
        let urole = req.session.urole;
        if (urole !== 'admin') {
            res.redirect('/');
            return;
        }

        con.query("INSERT INTO type_of_fabric (name) VALUES ('" + req.body.name + "')", function(err, result) {
            if (err) {
                console.log(err);
                return;
            }
            res.redirect('/fabric');
        });
    } else {
        res.redirect('/');
        return;
    }
});

router.get('/delete-fabric/:id', function(req, res, next) {
    if (req.session.loggedin) {
        let username = req.session.username;
        let urole = req.session.urole;
        if (urole !== 'admin') {
            res.redirect('/');
            return;
        }

        let id = req.params.id;
        con.query("DELETE FROM type_of_fabric WHERE id = '" + id + "'", function(err, result) {
            if (err) {
                console.log(err);
                return;
            }
            res.redirect('/fabric');
        });

    } else {
        res.redirect('/');
        return;
    }
});

// delete product 
router.get('/delete-product/:id', function(req, res, next) {
    if (req.session.loggedin) {
        let username = req.session.username;
        let urole = req.session.urole;
        if (urole !== 'admin') {
            res.redirect('/');
            return;
        }

        let id = req.params.id;
        //remove file 
        con.query("SELECT * FROM product WHERE id = '" + id + "'", function(err, result) {
            if (err) {
                console.log(err);
                return;
            }
            let image = result[0].image;

            fs.unlink(__dirname + "/../public/" + image, function(err) {
                if (err) throw err;
                // if no error, file has been deleted successfully
                console.log('File deleted!');
            });
        });

        con.query("DELETE FROM product WHERE id = '" + id + "'", function(err, result) {
            if (err) {
                console.log(err);
                return;
            }
            res.redirect('/products');
        });

    } else {
        res.redirect('/');
        return;
    }
});


module.exports = router;