let express = require('express');
let router = express.Router();
let passport = require('passport');
let LocalStrategy = require('passport-local').Strategy;

let User = require('../../models/User');
let property = require("../../models/Property");


// Register User
router.post('/register', function (req, res) {
	let email = req.body.email;
	let name = req.body.name;
	let phonenumber = req.body.phonenumber;
	let password = req.body.password;
	let role = req.body.role

	if (!name) {
		console.log("Errors");
	}
	else {
		//checking for email and username are already taken
			User.findOne({ email: { 
				"$regex": "^" + email + "\\b", "$options": "i"
		}}, function (err, mail) {
				if ( mail ) {
					res.send({
						error: 'you cannot do that son'
					})

				}
				else {
					let newUser = new User({
						name: name,
						email: email,
						phonenumber: phonenumber,
						password: password,
						role: role
						
					});

					User
					.createUser(newUser, function (err, user) {
						if (err) throw err;
						console.log(user);
						res.redirect('/');
					})
         			
				}
			});
	}
});

router.get('/api', function (req, res){

	User.find({})
    .populate("property")
    .then(function (data) {
      res.json(data)
    })
    .catch(function (err) {
      res.json(err);
    });
});

passport.use(new LocalStrategy({
	usernameField: 'email'
	},
	function (username, password, done) {
		User.getUserByUsername(username, function (err, user) {
			if (err) throw err;
			if (!user) {
				return done(null, false, { message: 'Unknown User' });
			}

			User.comparePassword(password, user.password, function (err, isMatch) {
				if (err) throw err;
				if (isMatch) {
					return done(null, user);
				} else {
					return done(null, false, { message: 'Invalid password' });
				}
			});
		});
	}));

passport.serializeUser(function (user, done) {
	done(null, user.id);
});

passport.deserializeUser(function (id, done) {
	User.getUserById(id, function (err, user) {
		done(err, user);
		console.log(user);
	});
});


router.post('/login', function(req, res, next) {
	passport.authenticate('local', function(err, user) {
		if(err) {
			return res.sendStatus(401);
		}
		req.logIn(user, (err) => {
			const  {email, phonenumber, _id, name, role}  = user;
			if(err) return res.sendStatus(401);
			return res.send({user:  {email, phonenumber, _id, name, role} })
		})

	})(req, res, next)
})

router.get('/authenticated', (req, res) => {
	if(req.user) {
		res.send({success: true, user: req.user});
	} else {
		res.send(null)
	}
})

router.post('/logout',  (req, res) => {
	req.logOut();
	res.send({success: true})
});

// View one property
router.get("/manager/:id", (req, res) => {
    if (req.params.id === "undefined") {
        console.log("No property ID detected")
    } else {
        User
            .findById(req.params.id)
            .then(dbModel => res.json(dbModel))
            .catch(err => res.status(422).json(err));
    }
});

router.put('/update', async (req, res) => {
	const {userId, propertyId, likeStatus} = req.body;
	const getUser = await User.findById(userId);
	console.log('asis', getUser.propertylike);
	const getLikedProducts = getUser.propertylike;
	console.log('--getting the like', likeStatus, getLikedProducts.indexOf(propertyId), getLikedProducts);

	if(likeStatus && getLikedProducts.indexOf(propertyId) === -1) {
		//add too array if it doesn't already exist
		getLikedProducts.push(propertyId);
		console.log('---pushed', getLikedProducts);
		await User.findByIdAndUpdate(userId, {$set: {propertylike: getLikedProducts} })
		res.send({success: true, user: getUser});
		return;
	} else if(!likeStatus && getLikedProducts.indexOf(propertyId) > -1) {
		const getIndex = getLikedProducts.indexOf(propertyId);
		getLikedProducts.splice(getIndex, 1);
		console.log(getLikedProducts, '---unlike');
		await User.findByIdAndUpdate(userId, {$set: {propertylike: getLikedProducts} })
		res.send({success: true, user: getUser});
		return;
	}
	//res.send({success: true, user: getUser})
})


module.exports = router;