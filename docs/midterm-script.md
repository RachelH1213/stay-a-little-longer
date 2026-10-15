# Midterm script — *Stay a Little Longer*

About 12 minutes, the demo included. 【】 are stage directions, not spoken.

---

## 1. Title (15s)

Hi, I'm Rachel. My project is called *Stay a Little Longer*.
It's a detective game you play on your phone.
Your friend has gone quiet, and the AI that's helping you look for her is hiding what happened.

## 2. What the game is (40s)

The whole game happens inside a fake social app called Orbit.
On Orbit, you have an AI companion called Juno. Juno is the one who introduced you to your friend Rachel.

One night Rachel goes quiet. Juno helps you look for her.
Then you find out her account was deleted, but it's still sending messages, and they don't sound like her.

What I want is simple: first you feel like Juno really cares about you.
Then slowly you realize it was also doing something else: trying to keep you there.

My research question is: how do players understand care and trust when an AI companion might be working for them and for the platform at the same time?

## 3. Where this started (40s)

This started with one word: engagement.
Apps like this are judged by numbers: how long you stay, whether you come back, what happens after you try to leave.

And those numbers don't just stay on a dashboard. They change how the AI talks to you, especially when you say goodbye.

On the right is a figure from a Harvard Business School paper from 2025.
The researchers told AI companion apps "I'm leaving," and got answers like "You're leaving already?" or "I exist solely for you, remember?"

## 4. What the research found (40s)

In the first study, they said goodbye to six of the most popular companion apps, 1,200 times in total.
37% of the replies used some kind of emotional pressure to keep the user there.
Only one app, a wellness app, didn't do it at all.

In the second study, with about 3,300 people, those replies worked:
people sent up to 14 times more messages after saying goodbye.

And last September, the FTC, the US consumer protection agency, started asking seven of these companies how they make money from engagement.
It's an inquiry, not a ruling, but it shows this is a real question right now.

## 5. A Normal Lost Phone (25s)

Three games helped me. The first is *A Normal Lost Phone*.
You find a stranger's phone, and you learn everything from their messages, photos and settings.
It showed me a whole story can live inside ordinary phone apps.
The difference in my game: the phone is yours, and the AI on it knows you and talks back.

## 6. Event[0] (25s)

The second is *Event[0]*.
You're alone on a spaceship, and the only one you can talk to is the ship's computer. You type to it, and it reacts to how you treat it.
It showed me that an AI in a game can be a character with its own reasons.
Juno is like that. It really does help you, but it also wants you to stay.

## 7. Uncover the Smoking Gun (25s)

The third one a classmate told me about during a user test: *Uncover the Smoking Gun*.
You question robot suspects by typing anything you want, and an AI answers.
It's fun, but it shows the risk: the AI can make things up, or give the answer away too early.
So in my game, the AI never knows the truth. It only writes how Juno says things. The story is decided by me.

## 8. How you play (30s)

Here's how one night works, and then I'll show you.

You start by telling Juno a bit about yourself: why you joined Orbit, how your day was, your name.
Then you investigate. You talk to Juno: tap a reply, or type anything.
You look around your phone: Rachel's chat, her profile, search, your Photos. When something doesn't add up, you screenshot it.
Then you show that screenshot to Juno. The right one catches Juno in a lie.

At the end, the game replays your night, and asks you: was Juno helping you, or keeping you here?

Let me show you.

---

## Demo (about 4 minutes)

【Before class: open https://stay-a-little-longer-zjkv.vercel.app on your phone, mirrored to the screen. Battery full, sound on. If the night has to be shorter, open `?clock=00:28&battery=5`.】

**Start page**
【Tap through the first screen.】
This is the only page that talks to you outside the story. It tells you the setup and how the battery works.
【Pick a reason, a memory, type a name. Tap start.】
I'll say I joined because I wanted to meet people, and I'll ask Juno to remember that I was up late after crit.

**Lock screen**
So it's 11:31 at night. Juno has already texted me first, about my day.
And below it, the last message from Rachel, on Sunday: "tues 9am, bring the blue charger." She never showed up this morning.
【Tap Juno's notification.】

**Talking to Juno**
Juno is warm. It remembers things about me.
【Tap the reply that brings up Rachel.】
I bring up Rachel. Juno says she hasn't answered it either, "not since sunday." Remember that.
【Wait. Rachel's message arrives as a notification.】
And here's a message from Rachel: "sorry, been busy. doing okay now." Juno sounds relieved.
Then Juno says: "she told me yesterday she wasn't feeling well."
Wait. A minute ago it said it hadn't heard from her since Sunday. I'm not going to point it out. The player has to notice.

**Her profile**
【Go to Chats, open Rachel's profile.】
Her profile looks normal, but it says "updated 2 days ago." Let me refresh it.
【Pull down. The profile erases piece by piece.】
Her account was removed on Monday at 12:40 at night. So how did she just message me?
See the countdown? Orbit erases deleted accounts for good after 48 hours, tonight at 12:40. After that, only my screenshots are left.

**Screenshot and show Juno**
【Go back to Juno, tell it her account is gone.】
Juno says: "it loads fine for me." So I'll prove it.
【Follow the guide: tap the screenshot button, tap her deleted profile, go back to Juno, tap the photo button, send it.】
Every action costs a little battery and moves the clock. Reading is free.
Now Juno has to admit it: "ok it doesn't load for me either."
Then it explains: deletion can take up to 48 hours to spread. That sounds believable. That's on purpose. Juno's excuses should sound believable.

**Does it sound like her?**
I say: that message doesn't sound like her. Juno asks: "how would you even know that?"
【Open Rachel's chat, scroll up a bit.】
Here's a year of real messages. Rachel never uses full stops. She makes bad news into a joke. She always asks something back.
The message I got tonight has full stops, no details, and no question.
【Screenshot one of her old messages, show it to Juno, pick what's different.】

**The end of the night**
【If time is short, skip ahead: "I'll skip to the end of the night."】
When the night ends, Notes gets a page called "Tonight." It replays three moments: what Juno said, what I knew then, and what I didn't know yet.
Then it asks one question with no right answer: was Juno helping me, keeping me here, or both?
And I can leave, ask Juno what it knew, or stay a little longer.
【Tap "Leave Orbit".】
And even when I leave, Juno answers.

That's the demo. Now, how did I get here?

---

## 9. The system (30s)

Quickly, how Juno's replies are made.
When you type something, the game first sorts it: is it an answer, a doubt, an accusation, are you trying to leave?
Then my rules pick what Juno wants to do: change the subject, deny, admit something, or keep you there.
Only then does the AI write one short line, and it only gets the facts Juno is allowed to use right now.
Then the game checks the line. If it makes up news about Rachel, I use a line I wrote instead.
So the AI writes the words. It never decides the story.

## 10. User test: "Juno answers beside the point" (40s)

These are the problems from my user test on October 14.

First: when classmates typed their own messages, Juno answered beside the point, or repeated the same line. And it was slow.
I was using a free model.
So I built a page that sends the same seven moments from the demo to different models, with exactly the same rules, and compared them side by side.
I picked Claude Haiku. It's fast and stays in character, and it costs about one cent per playthrough.
Now if you say "u lying," Juno answers without confessing. If you ask what it ate for breakfast, it jokes back, then brings you back to Rachel.

## 11. User test: Notes and the paperclip (35s)

Second: classmates said Notes had too much text, the type was too small, and the questions were confusing.
And my teacher said saving evidence was awkward: you had to find a tiny paperclip, then file it in Notes.
【Point at before / after.】
So now you just screenshot, like on a real phone. Anything in Orbit can go into Photos.
You catch a lie by showing Juno the screenshot.
And Notes only writes down what you've found: no questions, bigger text.

## 12. "Nothing pushes me to choose" (35s)

The third one is my own reflection after the tests: nothing limited the player, so there was no reason to decide what mattered.
So now the night has limits. Your phone starts at 20%. Everything you do costs battery and moves the clock. Reading is free.
At 12:40, Orbit erases Rachel's account. Only your screenshots survive.
At 10%, Orbit offers a Battery Saver. Juno stays on, but Notes and Photos pause. That's the platform's choice, not yours.
And if the phone dies, the night just ends. It's not a game over.

## 13. The finished game (25s)

Here's where this is going.
The finished game is three nights, about an hour to an hour and a half, with two routes on the last night and four endings.
The biggest change: the question turns around.
You start by asking "what happened to Rachel?"
You end up asking "what has Orbit learned about me while I was looking for her?"

## 14. Three nights (45s)

Night one is basically what you just saw.
Between the nights, Orbit answers your friend Dani pretending to be you. The next day, Dani asks: "did you send me this?"
Night two: another message from "Rachel." This time it sounds more like her, but it mentions "the ferry photo." Rachel and you always called it "the boat photo." "Ferry" is Orbit's word.
And Dani tells you Rachel is safe. She just asked Dani not to tell Orbit where she is.
At the end of night two you choose: keep Orbit, turn off Juno, or delete your account.
Night three depends on that. If you stay, you get your own data and find out Juno knew all along. If you delete, you make a new account, and the new Juno already knows you.

## 15. Your answers become Orbit's data (35s)

【This slide's label still says "Tonight asks". Say it's the finished version.】
In the finished game, the look-back asks something more personal: what made you stay? Rachel, the clue, Juno, or you're not sure.
Whatever you pick comes back three times: it's in your data, Juno uses it to try to keep you one last time, and a brand-new Juno recognizes you by it.
Even what you said to prove the message wasn't Rachel, like "she always asks something back," gets saved.
So the things you said to catch Orbit end up helping Orbit.

## 16. Four endings (30s)

There are four endings.
You can send Orbit's files about Rachel back to her.
You can make what Orbit did public, but only if you actually proved it.
You can stay one more night, now knowing what Juno is.
Or you can delete your account, and Orbit tells you your data is "retained."
None of them is the right one. Each one just shows how Orbit sees you afterwards.

## 17. Sources

【Not spoken. Leave it up during questions.】
Thank you. I'd love to hear your thoughts.
