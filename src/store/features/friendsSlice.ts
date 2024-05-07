import { createSlice } from "@reduxjs/toolkit";
import { nanoid } from "nanoid";

export type TFriend = {
  id: string;
  name: string;
  email: string;
  onlineStatus: string;
  job: string;
  img: string;
  messages: TMessages[];
}

type TRequest = Omit<TFriend, "messages">

type TUsers = {
  friends: TFriend[]
  requests: TRequest[]
}

export type TMessages = {
  id: string;
  senderId: string;
  message: string;
}

const initialState: TUsers = {
  friends: [
    {
      id: nanoid(5),
      name: 'Alice Diaz',
      email: 'alice1998@gmail.com',
      onlineStatus: 'online',
      job: 'Bartender',
      img: '/friend1.jpg',
      messages: [
        {
          id: nanoid(5),
          senderId: "friend",
          message: "Hey there! How's it going?"
        },
        {
          id: nanoid(5),
          senderId: "user",
          message: "Not bad, just chilling. What about you?"
        },
        {
          id: nanoid(5),
          senderId: "user",
          message: "By the way, did you catch the latest episode of that new show?"
        },
        {
          id: nanoid(5),
          senderId: "friend",
          message: "Oh yeah, it was great! The plot twists were unexpected."
        },
        {
          id: nanoid(5),
          senderId: "friend",
          message: "What did you think of the main character's decisions?"
        },
        {
          id: nanoid(5),
          senderId: "user",
          message: "I think they were justified considering the circumstances. It added depth to the story."
        },
        {
          id: nanoid(5),
          senderId: "user",
          message: "Anyway, got any plans for the weekend?"
        },
        {
          id: nanoid(5),
          senderId: "friend",
          message: "Not really, just hanging out with some friends. How about you?"
        }
      ]
    },
    {
      id: nanoid(5),
      name: 'Bob Smith',
      email: ' bob1985@example.com',
      onlineStatus: 'away',
      job: 'Ftv Model',
      img: '/friend2.jpg',
      messages: [
        {
          id: nanoid(5),
          senderId: "friend",
          message: "Hey! How have you been?"
        },
        {
          id: nanoid(5),
          senderId: "user",
          message: "I've been good, thanks for asking. What about you?"
        },
        {
          id: nanoid(5),
          senderId: "user",
          message: "Did you see that new movie that just came out?"
        },
        {
          id: nanoid(5),
          senderId: "friend",
          message: "Yeah, I saw it! It was amazing. You should definitely check it out."
        },
        {
          id: nanoid(5),
          senderId: "friend",
          message: "What do you think about going hiking next weekend?"
        },
        {
          id: nanoid(5),
          senderId: "user",
          message: "That sounds like a great idea! I'm in."
        },
        {
          id: nanoid(5),
          senderId: "user",
          message: "By the way, have you tried that new restaurant downtown?"
        },
        {
          id: nanoid(5),
          senderId: "friend",
          message: "Not yet, but I've heard good things about it. We should go together sometime."
        }
      ]
    },
    {
      id: nanoid(5),
      name: "Carol Black",
      email: "carol1976@gmail.com",
      onlineStatus: "online",
      job: 'Work at IMB',
      img: "/friend3.jpg",
      messages: [
        {
          id: nanoid(5),
          senderId: "user",
          message: "Hey, how's your day going?"
        },
        {
          id: nanoid(5),
          senderId: "friend",
          message: "It's been pretty good! Just got back from a jog. What about you?"
        },
        {
          id: nanoid(5),
          senderId: "user",
          message: "Not bad, just catching up on some reading. Have you read any good books lately?"
        },
        {
          id: nanoid(5),
          senderId: "friend",
          message: "Yeah, I recently finished a mystery novel that was really captivating."
        },
        {
          id: nanoid(5),
          senderId: "friend",
          message: "Thinking about trying out a new recipe for dinner tonight. Any suggestions?"
        },
        {
          id: nanoid(5),
          senderId: "user",
          message: "You should try making homemade pizza! It's always a hit."
        },
        {
          id: nanoid(5),
          senderId: "user",
          message: "Have you been to that new café downtown yet?"
        },
        {
          id: nanoid(5),
          senderId: "friend",
          message: "Not yet, but I've heard great things about their pastries. Let's go together sometime!"
        }
      ]

    },
    {
      id: nanoid(5),
      name: "David Goggins",
      email: "david1990@gmail.com",
      onlineStatus: "offline",
      job: 'Football Pundit',
      img: "/friend4.jpg",
      messages: [
        {
          id: nanoid(5),
          senderId: "friend",
          message: "Hey, how are you?"
        },
        {
          id: nanoid(5),
          senderId: "user",
          message: "I'm good, thanks! What about you?"
        },
        {
          id: nanoid(5),
          senderId: "friend",
          message: "Doing well, just relaxing at home."
        }
      ]

    },
    {
      id: nanoid(5),
      name: "Eve Evangeline",
      email: "eve1983@gmail.com",
      onlineStatus: "offline",
      job: 'Actress',
      img: "/friend5.jpg",
      messages: [
        {
          id: nanoid(5),
          senderId: "user",
          message: "Hey, how was your weekend?"
        },
        {
          id: nanoid(5),
          senderId: "friend",
          message: "It was great! I went hiking with some friends. What about you?"
        },
        {
          id: nanoid(5),
          senderId: "user",
          message: "I had a relaxing weekend, just caught up on some reading."
        },
        {
          id: nanoid(5),
          senderId: "friend",
          message: "Nice! Anything interesting you read?"
        },
        {
          id: nanoid(5),
          senderId: "user",
          message: "Yeah, I started a new novel. It's really engaging so far."
        },
        {
          id: nanoid(5),
          senderId: "friend",
          message: "That's awesome! Let me know how it turns out."
        }
      ]

    },
    {
      id: nanoid(5),
      name: "Frank Sinatra",
      email: "frank1978@gmail.com",
      onlineStatus: "away",
      job: 'Student',
      img: "/friend6.jpg",
      messages: [
        {
          id: nanoid(5),
          senderId: "friend",
          message: "Hey, how are you?"
        },
        {
          id: nanoid(5),
          senderId: "user",
          message: "I'm good, thanks! What about you?"
        },
        {
          id: nanoid(5),
          senderId: "friend",
          message: "Doing well, just relaxing at home."
        }
      ]
    },
    {
      id: nanoid(5),
      name: "Grace Johnson",
      email: "grace1986@gmail.com",
      onlineStatus: "online",
      job: 'Personal Business',
      img: "/friend7.jpg",
      messages: [
        {
          id: nanoid(5),
          senderId: "friend",
          message: "Hey, how are you?"
        },
        {
          id: nanoid(5),
          senderId: "user",
          message: "I'm good, thanks! What about you?"
        },
        {
          id: nanoid(5),
          senderId: "friend",
          message: "Doing well, just relaxing at home."
        }
      ]
    },
    {
      id: nanoid(5),
      name: "Hannah Carey",
      email: "hannah1989@gmail.com",
      onlineStatus: "offline",
      job: 'Actress',
      img: "/friend8.jpg",
      messages: [
        {
          id: nanoid(5),
          senderId: "friend",
          message: "Hey, how are you?"
        },
        {
          id: nanoid(5),
          senderId: "user",
          message: "I'm good, thanks! What about you?"
        },
        {
          id: nanoid(5),
          senderId: "friend",
          message: "Doing well, just relaxing at home."
        }
      ]
    },
    {
      id: nanoid(5),
      name: "Alexander Isak",
      email: "isaac1980@gmail.com",
      onlineStatus: "away",
      job: 'Teacher',
      img: "/friend9.jpg",
      messages: [
        {
          id: nanoid(5),
          senderId: "friend",
          message: "Hey! How have you been?"
        },
        {
          id: nanoid(5),
          senderId: "user",
          message: "I've been good, thanks for asking. What about you?"
        },
        {
          id: nanoid(5),
          senderId: "user",
          message: "Did you see that new movie that just came out?"
        },
        {
          id: nanoid(5),
          senderId: "friend",
          message: "Yeah, I saw it! It was amazing. You should definitely check it out."
        },
        {
          id: nanoid(5),
          senderId: "friend",
          message: "What do you think about going hiking next weekend?"
        },
        {
          id: nanoid(5),
          senderId: "user",
          message: "That sounds like a great idea! I'm in."
        },
        {
          id: nanoid(5),
          senderId: "user",
          message: "By the way, have you tried that new restaurant downtown?"
        },
        {
          id: nanoid(5),
          senderId: "friend",
          message: "Not yet, but I've heard good things about it. We should go together sometime."
        }
      ]
    },
    {
      id: nanoid(5),
      name: "Bran Brown",
      email: "bramn1970@gmail.com",
      onlineStatus: "offline",
      job: 'Driver',
      img: "/friend10.jpg",
      messages: [
        {
          id: nanoid(5),
          senderId: "friend",
          message: "Hey, how are you?"
        },
        {
          id: nanoid(5),
          senderId: "user",
          message: "I'm good, thanks! What about you?"
        },
        {
          id: nanoid(5),
          senderId: "friend",
          message: "Doing well, just relaxing at home."
        }
      ]
    },
    {
      id: nanoid(5),
      name: "Lilly Morgan",
      email: "lillu1960@gmail.com",
      onlineStatus: "offline",
      job: 'Teacher',
      img: "/friend11.jpg",
      messages: [
        {
          id: nanoid(5),
          senderId: 'friend',
          message: "what's liz short for? :)"
        },
        {
          id: nanoid(5),
          senderId: 'user',
          message: "Elizabeth lol"
        },
        {
          id: nanoid(5),
          senderId: 'user',
          message: "wanna know whats my second guess was?"
        },
        {
          id: nanoid(5),
          senderId: 'user',
          message: "wanna know whats my second guess was?"
        },
      ]
    },
    {
      id: nanoid(5),
      name: "Elizabeth Robbie",
      email: "eliza1970@gmail.com",
      onlineStatus: "away",
      job: 'Gardener',
      img: "/friend12.jpg",
      messages: [
        {
          id: nanoid(5),
          senderId: "friend",
          message: "Hey! How have you been?"
        },
        {
          id: nanoid(5),
          senderId: "user",
          message: "I've been good, thanks for asking. What about you?"
        },
        {
          id: nanoid(5),
          senderId: "user",
          message: "Did you see that new movie that just came out?"
        },
        {
          id: nanoid(5),
          senderId: "friend",
          message: "Yeah, I saw it! It was amazing. You should definitely check it out."
        },
        {
          id: nanoid(5),
          senderId: "friend",
          message: "What do you think about going hiking next weekend?"
        },
        {
          id: nanoid(5),
          senderId: "user",
          message: "That sounds like a great idea! I'm in."
        },
        {
          id: nanoid(5),
          senderId: "user",
          message: "By the way, have you tried that new restaurant downtown?"
        },
        {
          id: nanoid(5),
          senderId: "friend",
          message: "Not yet, but I've heard good things about it. We should go together sometime."
        }
      ]
    },
    {
      id: nanoid(5),
      name: "Margott Olsen",
      email: "margott1997@gmail.com",
      onlineStatus: "online",
      job: 'Model',
      img: "/friend13.jpg",
      messages: [
        {
          id: nanoid(5),
          senderId: "friend",
          message: "Hey! How have you been?"
        },
        {
          id: nanoid(5),
          senderId: "user",
          message: "I've been good, thanks for asking. What about you?"
        },
        {
          id: nanoid(5),
          senderId: "user",
          message: "Did you see that new movie that just came out?"
        },
        {
          id: nanoid(5),
          senderId: "friend",
          message: "Yeah, I saw it! It was amazing. You should definitely check it out."
        },
        {
          id: nanoid(5),
          senderId: "friend",
          message: "What do you think about going hiking next weekend?"
        },
        {
          id: nanoid(5),
          senderId: "user",
          message: "That sounds like a great idea! I'm in."
        },
        {
          id: nanoid(5),
          senderId: "user",
          message: "By the way, have you tried that new restaurant downtown?"
        },
        {
          id: nanoid(5),
          senderId: "friend",
          message: "Not yet, but I've heard good things about it. We should go together sometime."
        }
      ]
    },

  ],
  requests: [
    {
      id: nanoid(5),
      name: 'Mary Smith',
      email: 'mary1998@gmail.com',
      onlineStatus: 'online',
      job: 'Bartender',
      img: '/request1.jpg'
    },
    {
      id: nanoid(5),
      name: 'Phil Foden',
      email: ' phil1985@example.com',
      onlineStatus: 'away',
      job: 'Ftv Model',
      img: '/request2.jpg'
    },
    {
      id: nanoid(5),
      name: "Andy Caroll",
      email: "andy1976@gmail.com",
      onlineStatus: "online",
      job: 'Work at IMB',
      img: "/request3.jpg"
    },
    {
      id: nanoid(5),
      name: "John Krasinski",
      email: "john1990@gmail.com",
      onlineStatus: "offline",
      job: 'Football Pundit',
      img: "/request4.jpg"
    },
    {
      id: nanoid(5),
      name: "Ketty Hatheway",
      email: "ketty1983@gmail.com",
      onlineStatus: "offline",
      job: 'Actress',
      img: "/request5.jpg"
    },
    {
      id: nanoid(5),
      name: "Arwen Undomiel",
      email: "arwen1978@gmail.com",
      onlineStatus: "away",
      job: 'Student',
      img: "/request6.jpg"
    },
    {
      id: nanoid(5),
      name: "Grace Gosling",
      email: "grace1986@gmail.com",
      onlineStatus: "online",
      job: 'Personal Business',
      img: "/request7.jpg"
    },
    {
      id: nanoid(5),
      name: "Hannah Montanna",
      email: "hannah1989@gmail.com",
      onlineStatus: "offline",
      job: 'Actress',
      img: "/request8.jpg"
    },
    {
      id: nanoid(5),
      name: "Isaac Gordon",
      email: "isaac1980@gmail.com",
      onlineStatus: "away",
      job: 'Teacher',
      img: "/request9.jpg"
    },
    {
      id: nanoid(5),
      name: "Bran Stark",
      email: "bramn1970@gmail.com",
      onlineStatus: "offline",
      job: 'Driver',
      img: "/request10.jpg"
    },
  ]
};

const friendsSlice = createSlice({
  name: 'friends_request',
  initialState: initialState,
  reducers: {
    sendMessage: (state, { payload }) => {
      const { friendId, message } = payload;
      const friend = state.friends.find(friend => friend.id === friendId);
      if (friend) {
        const newMessage = {
          id: nanoid(5),
          senderId: 'user',
          message: message
        };
        friend.messages.push(newMessage); // Fixed line
      }
    }
  },
  selectors: {
    getFriends: (state) => state.friends,
    getRequests: (state) => state.requests
  }
});

export const { sendMessage } = friendsSlice.actions
export const { getFriends, getRequests } = friendsSlice.selectors
export default friendsSlice.reducer;