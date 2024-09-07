import random

print("Enter *+* to quit")

def mult_prac():
	while True:
		num_in = input("Number to practice: ")
		if num_in == "*+*":
			return
		try:
			int_in = int(num_in)
			break
		except ValueError:
			print("Please enter a number.")



	#create list for wrong numbers
	wrong = []

	#create list of correct and incorrect messages
	correct = ["Good job!", "Right!", "Yep!", "Nailed it.", "Spot on!", "Bingo!", "Crushed it.", "Totally!", "Perfecto!", "You are killing it.", "Genius!", "Fantastic!", "You rock!", "Awesome!", "Niiiiiiiice!", "Yaaaasssss!", "So. Dang. Smart."]
	incorrect = ["Nope", "Sorry, that's not it", "Maybe next time", "No. Focus!", "Hmmm, no.", "Uuuuuuh, no.", "Ew, no!.", "Nasty! No way."]

	# Create list of numbers 1-12 named num_list
	num_list = list(range(1, 13))


	#Is list empty? no:
	while len(num_list) > 0:

		# Get random number from num_list
		test = num_list.pop(random.randrange(len(num_list)))
		num_test = int(test)
		print()
		#ask user math problem, get answer
		while True:
			eval = input(f"What is {test} x {num_in}? ")

			if eval == "*+*":
				return
			try:
				int_eval = int(eval)
				break
			except ValueError:
				print("Please enter a number.")
		# is eval correct?
		if int_eval == num_test*int_in:
			print(random.choice(correct))
		else:
			print(random.choice(incorrect))
			wrong.append(num_test)

	if len(wrong) == 0:
			print()
			print("Wow, 100%!!\n")
			return
	else:
		num_wrong = len(wrong)
		while len(wrong) > 0:
			print()
			test = wrong.pop(random.randrange(len(wrong)))
			eval = input(f"What is {test} x {int_in}? ")
			int_eval = int(eval)
			if int_eval == test*int_in:
				print(random.choice(correct))
			else:
				print(random.choice(incorrect))
				wrong.append(test)
				num_wrong = num_wrong + 1
		print()
		print(f"You got them all!\nYou missed {num_wrong}.\n")
		return

