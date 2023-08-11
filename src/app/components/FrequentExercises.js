// FrequentExercises.js
import React from "react";
import ExerciseCard from "./ExerciseCard";

const FrequentExercises = () => {

    const FrequentExercisesData = [
      {
        id: 1,
        exercise_name: "Dumbbell Curl",
        videoURL: [
          "https://media.musclewiki.com/media/uploads/videos/branded/male-dumbbell-curl-front.mp4#t=0.1",
          "https://media.musclewiki.com/media/uploads/videos/branded/male-dumbbell-curl-side.mp4#t=0.1",
        ],
        steps: [
          "Stand up straight with a dumbbell in each hand at arm's length.",
          "Raise one dumbbell and twist your forearm until it is vertical and your palm faces the shoulder.",
          "Lower to original position and repeat with opposite arm",
        ],
        Category: "Dumbbells",
        Difficulty: "Beginner",
        Force: "Pull",
        Grips: "Underhand",
        target: {
          Primary: ["Biceps"],
        },
        youtubeURL: "https://www.youtube.com/embed/P1FqV-oFn5M",
        details:
          "\nHow To Perform the Dumbbell Bicep CurlSetupGrab two dumbbells and stand tall with your shoulder blades pulled back and your chest poked out. You can start with either the dumbbells in front of your quads or off to the sides of your legs. Whichever is more comfortable. Also, whichever will allow you to fully extend your elbows at the bottom of each rep.Use a shoulder width or slightly inside of shoulder width stance.\u00a0Performing\u00a0Begin the rep by flexing your elbows. Try to touch your forearms to your biceps at the very top of the movement. Then begin the eccentric. Make sure to fully extend your elbows at the bottom of each rep so you get a full range of motion.\u00a0It is easy to use momentum on a bicep curl. We want our muscles and not momentum to do the work. So make sure you keep these strict. If you find yourself swinging the weight up, then your biceps have hit fatigue and it's time to end the set.\n",
      },
      {
        id: 67,
        exercise_name: "Barbell Bench Press",
        videoURL: [
          "https://media.musclewiki.com/media/uploads/videos/branded/male-barbell-bench-press-front.mp4#t=0.1",
          "https://media.musclewiki.com/media/uploads/videos/branded/male-barbell-bench-press-side_KciuhbB.mp4#t=0.1",
        ],
        steps: [
          "Lay flat on the bench with your feet on the ground. With straight arms unrack the bar.",
          "Lower the bar to your mid chest",
          "Raise the bar until you've locked your elbows.",
        ],
        Aka: "Chest Press, Bench",
        Category: "Barbell",
        Difficulty: "Intermediate",
        Force: "Push",
        Grips: "Overhand",
        target: {
          Primary: ["Chest"],
          Secondary: ["Triceps"],
          Tertiary: ["Shoulders"],
        },
        youtubeURL: "https://www.youtube.com/embed/YwK4sbSrtso",
        details:
          "\nDetailed How-ToDo Your Work Early (The Setup)We're going to start from the feet and work our way up.Foot PlacementYou can either be flat footed or just have toes on the ground. Either way, push your toes to generate some tension in your quads. Generating tension through your whole body will help you lift more weight.\u00a0Torso TechniquePoint your rib cage at the ceiling and pull your shoulder blades back really hard. Dig your shoulder blades into the bench. This will arch your spine somewhat. This is the only time it is ok to extend your spine. Because you are braced against the bench, the bench will soak up a lot of the tension that would otherwise fall on your lumbar spine.GripGrip width should be just outside of shoulder width. Make sure the bar is set very deeply in your hands. This will help prevent your wrists from getting extended, which will in run help you handle more weight safely.\u00a0Performing The Bench PressUn-rack the bar. Break at the elbows and bring the bar toward your rib cage, not chest. The bar path should be an arc like curve.Make sure the bar touches your rib cage before you initiate the concentric.\u00a0At the top of the rep, extend your elbows but stop short of hyperextending as this could lead to an injury.\u00a0When the rep is complete, slam the bar back into the rack, then lower into the hooks/cups.Ty's TipsTiming is everythingAs you perform the eccentric, you want to move under control, but not slowly. I've seen many times a client or friend miss a heavy rep on the bench press because they moved too slowly during the lowering phase. Moving slowly during the eccentric is usually caused by unsureness. Think about it, when you're lifting a heavy weight, and not sure if you are going to complete it, you move slower.Also, try to properly time out when you initiate the press. You should begin pressing back toward the ceiling as the bar is touching your sternum.Lift with confidence always! If you fail the rep, then you failed the rep. No big deal. Just keep it pushing and you'll get it at some point. This leads me to my second tip.No Shame in Asking For HelpDon't be hesitant to ask for a spot if you don't have a gym partner. Most people are happy to help. There's research showing that a lifter will perform better with a spotter. Your muscles won't be any stronger with or without a spotter of course. So why the improvement in performance? The confidence alluded to in the how to section. Knowing someone is there to get the bar if you fail provides the security to allow you to lift with confidence.Just make sure you communicate before starting the set.\u00a0First, ask them to give you a lift off. I've had many ask me for a spot then say they don't want a lift off. Never quite understood why. In many cases (unless you have very long arms), you will lose your shoulder blade retraction when trying to un-rack the bar. If your arms are mostly extended the only choice you have to un-rack is to protract your shoulder blades. The further you can get your shoulder blades pulled back the better. Retracting the shoulder blades also gives more room in the shoulder joint so it is generally a safer position.Also, let the spotter know how many reps you're going for so they know what to expect and don't jump in too early. Let them know whether or not you want help completing any reps. For example, \"I'm going for 10 reps, but i might fail around 8. If I can't get the all the reps by myself can you help me get the remaining ones?\"\u00a0Although, I suggest once you hit muscular fatigue, you end your set. Once a muscle hits fatigue, doing additional reps does not induce more muscle growth, but does fatigue you more. Too much risk, not enough reward.\n",
      },
      {
        id: 75,
        exercise_name: "Kettlebell Single Arm Press",
        videoURL: [
          "https://media.musclewiki.com/media/uploads/videos/branded/male-kettlebell-single-arm-chest-press-front.mp4#t=0.1",
          "https://media.musclewiki.com/media/uploads/videos/branded/male-kettlebell-single-arm-chest-press-side.mp4#t=0.1",
        ],
        steps: [
          "Laying on the floor with your knees bent and feet firmly on the floor, leave one arm resting to the side of the body.",
          "Using the other arm, hold the kettlebell at arms length directly upwards of your shoulder.",
          "Lower your arm until your upper arm to elbow is resting on the floor.",
          "Return to starting position.",
        ],
        Category: "Kettlebells",
        Difficulty: "Beginner",
        target: {
          Primary: ["Chest"],
        },
        youtubeURL: "",
      },
      {
        id: 131,
        exercise_name: "Machine Leg Press",
        videoURL: [
          "https://media.musclewiki.com/media/uploads/videos/branded/male-machine-leg-press-front.mp4#t=0.1",
          "https://media.musclewiki.com/media/uploads/videos/branded/male-machine-leg-press-side.mp4#t=0.1",
        ],
        steps: [
          "Place your legs on the platform with your feet at shoulder width.",
          "Release the weight and extend your legs fully, without locking your knees.",
          "Lower the weight until your legs are at a 90\u00b0 angle (but DO NOT allow your butt and lower back to rise off of the pad. This will put your lower back in a rounded position, which is very dangerous.)",
          "Raise the weight back to starting position.",
        ],
        Category: "Machine",
        Difficulty: "Intermediate",
        Force: "Push",
        Grips: "None",
        target: {
          Primary: ["Quads"],
        },
        youtubeURL: "",
      },
      {
        id: 783,
        exercise_name: "Forearm Plank",
        videoURL: [
          "https://media.musclewiki.com/media/uploads/videos/branded/male-bodyweight-forearm-plank-front.mp4#t=0.1",
          "https://media.musclewiki.com/media/uploads/videos/branded/male-bodyweight-forearm-plank-side.mp4#t=0.1",
        ],
        steps: [
          "Place forearms on the ground with your elbows bent at a 90\u00b0 angle aligned beneath your shoulders, with your arms parallel at shoulder-width.",
          "Your feet should be together, with only your toes touching the floor.",
          "Lift your belly off the floor and form a straight line from your heels to the crown of your head and hold.",
        ],
        Category: "Bodyweight",
        Difficulty: "Beginner",
        Force: "Hold",
        Grips: "Overhand Neutral",
        target: {
          Primary: ["Abdominals"],
        },
        youtubeURL: "https://www.youtube.com/embed/QMXncCeneZI",
        details:
          "\nForearm Plank Detailed How to:SetupI suggest starting in a kneeling position as opposed to starting with your hips on the ground. When you begin from the hips on the ground position, your lumbar spine is hyperextended, which is dangerous and to be avoided in the overwhelming majority of exercises.You can either do a closed fist or open hand position. Whichever feels more comfortable. Step one foot back, and then the other to begin the Plank.Performing The Forearm PlankBe careful to not let your hips rise or sag as you were holding the forearm Plank. Maintain a flat back the entire set. If you are having trouble knowing if your back is flat, try performing the exercise in front of a mirror so you can check your form.\u00a0Continuously press your elbows into the ground and spread your scapula. This will recruit your serratus anterior and get you some extra core work.How To Progress The Forearm Plank:Like any other exercise, progression is important with the Plank. However, since the Plank is a hold and not a dynamic exercise with reps, it can be challenging knowing how to and when to progress the Plank. Here\u2019s a quick step by step guide on progressing the PlankSet a range similar to a rep range. For example, 45 to 60 seconds. Let\u2019s say in the beginning you are only able to do 45 seconds. Each week, try to add a bit more time (2-5 secs). Once you are able to complete 60 seconds with good form time to further progress.Switch to a more difficult variation. The natural next step is switching to the Hand Plank. Keep your same time range of 45-60 seconds. Since this is a more difficult variation you will likely fatigue before 60 seconds. Build your way back to 60 seconds like you did with the Forearm Plank.\u00a0Add weight. At this point, it\u2019s time to try adding some resistance to the Plank. Start light! You can either ask a gym buddy or place the weight on your back yourself. Either way, make sure the plate is in the middle of your upper back and not your lumbar spine. Then you can progress the plank similarly to any other exercise. By adding weight bit by bit overtime.You can continue to progress by going to a more difficult hold (Long Lever Plank, Hollow Hold) and then adding weight to those over time.\u00a0\n",
      },
    ]; 
   
  return (
    <div>
      <h2 className="text-slate-400 py-4">Frequently searched:</h2>
      <ul>
        {FrequentExercisesData.map((exercise) => (
          <ExerciseCard key={exercise.id}  exercise={exercise} />
        ))}
      </ul>
    </div>
  );
};

export default FrequentExercises;
