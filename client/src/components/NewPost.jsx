export default function NewPost() {
    return(
    <div className="ml-56 my-2 w-2/3 border-4 border-green-800 rounded-2xl">
    <div className="grid grid-cols-3 gap-2">
      <div className="col-span-1 w-full h-56 overflow-hidden rounded-2xl border-4 flex justify-end items-center">
        <img className="object-cover" src="https://images.pexels.com/photos/2817430/pexels-photo-2817430.jpeg?auto=compress&cs=tinysrgb&w=600" alt="sleeping cat" />
        </div>
        <div className="col-span-2">
          <h2 className="text-2xl capitalize font-bold p-2 my-2">The pros and cons of sleeping</h2>
          <div className="text-lg font-serif p-2">  
          <a className="hover:text-blue-600" href="#"><h3>By author</h3></a>
          <time>2023-05-12</time>
          </div>     
          <p className="text-md font-thin p-2 mb-2">Never had sleep before? Wonder what it's like? Do not worry, you are not alone! Here's a word from our expert, explaining the benefits and drawbacks of this activity.</p>
          <span className="pill">Beginner-friendly</span>
        </div>
      </div>
      <div>
        <p className="font-sans text-md p-2">
        Anyone who has been in higher education knows about sleep debt. It is the kind of exhaustion that starts early in adults, with at least one-third of college students reporting the so-called “academic burnout” and nearly a half complaining of constantly feeling tired or sleepy.<br/>
        In fact, as a person who spent more than 12 years in academia in different roles, I cannot recall even one student or teacher who has not mentioned overwork or lack of sleep as a part of their college life.<br/>
        <b>What does it mean for working adults?</b><br/>
        <i>If being tired is the norm, it means you cannot recognize exhaustion as a symptom of burnout at work. And you cannot fight what you cannot see.</i>
        </p>
        </div>      
    </div> 
    )
}