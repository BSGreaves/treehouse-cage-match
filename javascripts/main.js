$(function() {
	$(".battle-button").click(function(){
		loadContestants();
	});

	const loadContestants = () => {
		let contestants = {}
		let userInput1 = convertUsernameToJsonString("#inputContestant1");
		let userInput2 = convertUsernameToJsonString("#inputContestant2");
		Promise.all([returnPromise(userInput1), returnPromise(userInput2)])
		.then(data => {
			createCards(data);
		})
		.catch(error => {
			alert("One or both usernames were incorrect! Try again!")
		});
	}

	const convertUsernameToJsonString = (cssSelector) => {
		let thisString = $(cssSelector).val();
		thisString = "https://teamtreehouse.com/".concat(thisString);
		thisString = thisString.concat(".json")
		return thisString;
	}

	const returnPromise = (filepath) => {
		return new Promise ((resolve, reject) => {
			$.ajax(filepath)
			.done(data => resolve(data))
			.fail(error => reject(error))
		})
	}

	const createCards = (contestants) => {
		let contestant1 = contestants[0];
		let contestant2 = contestants[1];
		let $contestant1Card = $("<div>");
		let $contestant2Card = $("<div>");
		let $contestant1Img = $("<img>", {class: "img-circle img-responsive", src: contestant1.gravatar_url});
		let $contestant2Img = $("<img>", {class: "img-circle img-responsive", src: contestant2.gravatar_url});
		let $contestant1Name = $("<h2>", {class: "contestantName text-center", text: contestant1.name});
		let $contestant2Name = $("<h2>", {class: "contestantName text-center", text: contestant2.name});
		let $contestant1Points = $("<h1>", {class: "contestantPoints text-center", text: `Points: ${contestant1.points.total}`, id: "points1", value:`${contestant1.points.total}`});
		let $contestant2Points = $("<h1>", {class: "contestantPoints text-center", text: `Points: ${contestant2.points.total}`, id: "points2", value:`${contestant2.points.total}`});
		console.log(contestant1);
		console.log(contestant2);
		$contestant1Card.append($contestant1Img).append($contestant1Name).append($contestant1Points);
		$contestant2Card.append($contestant2Img).append($contestant2Name).append($contestant2Points);
		$("#contestant1-display").html($contestant1Card).hide().fadeIn(1000);
		$("#contestant2-display").html($contestant2Card).hide().delay(500).fadeIn(1000, ()=>{loadBadges()});
	}

	const loadBadges = () => {
		let winner = null;
		if ($("#points1").val() > $("#points2").val()) {

		}
	}
});

