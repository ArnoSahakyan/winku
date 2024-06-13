import { createSlice } from "@reduxjs/toolkit";
import { nanoid } from "nanoid";
import { deleteFriend, getFriendsApi, getRequestsApi, getUnassociatedApi, respondRequest } from "./friendThunks";

export type TFriend = {
  id: string;
  fname: string;
  email: string;
  onlineStatus: string;
  job: string;
  pfp: string;
  messages: TMessages[];
}

export type TRequest = {
  requestId: number,
  senderId: number,
  status: string,
  fname: string,
  pfp: string
}

export type TFriendBack = {
  id: number;
  fname: string;
  username: string;
  pfp: string;
  job: string;
  email: string;
  onlineStatus: string;
}

export type Tunassocitaed = {
  id: number,
  fname: string,
  username: string
  job: string,
  pfp: string,
}

type TUsers = {
  friends: TFriend[]
  requests: TRequest[],
  friendsBack: TFriendBack[],
  unassociated: Tunassocitaed[]
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
      fname: 'Alice Diaz',
      email: 'alice1998@gmail.com',
      onlineStatus: 'online',
      job: 'Bartender',
      pfp: '/friend1.jpg',
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
      fname: 'Bob Smith',
      email: ' bob1985@example.com',
      onlineStatus: 'away',
      job: 'Ftv Model',
      pfp: '/friend2.jpg',
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
      fname: "Carol Black",
      email: "carol1976@gmail.com",
      onlineStatus: "online",
      job: 'Work at IMB',
      pfp: "/friend3.jpg",
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
      fname: "David Goggins",
      email: "david1990@gmail.com",
      onlineStatus: "offline",
      job: 'Football Pundit',
      pfp: "/friend4.jpg",
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
      fname: "Eve Evangeline",
      email: "eve1983@gmail.com",
      onlineStatus: "offline",
      job: 'Actress',
      pfp: "/friend5.jpg",
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
      fname: "Frank Sinatra",
      email: "frank1978@gmail.com",
      onlineStatus: "away",
      job: 'Student',
      pfp: "/friend6.jpg",
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
      fname: "Grace Johnson",
      email: "grace1986@gmail.com",
      onlineStatus: "online",
      job: 'Personal Business',
      pfp: "/friend7.jpg",
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
      fname: "Hannah Carey",
      email: "hannah1989@gmail.com",
      onlineStatus: "offline",
      job: 'Actress',
      pfp: "/friend8.jpg",
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
      fname: "Alexander Isak",
      email: "isaac1980@gmail.com",
      onlineStatus: "away",
      job: 'Teacher',
      pfp: "/friend9.jpg",
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
      fname: "Bran Brown",
      email: "bramn1970@gmail.com",
      onlineStatus: "offline",
      job: 'Driver',
      pfp: "/friend10.jpg",
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
      fname: "Lilly Morgan",
      email: "lillu1960@gmail.com",
      onlineStatus: "offline",
      job: 'Teacher',
      pfp: "/friend11.jpg",
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
      fname: "Elizabeth Robbie",
      email: "eliza1970@gmail.com",
      onlineStatus: "away",
      job: 'Gardener',
      pfp: "/friend12.jpg",
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
      fname: "Margott Olsen",
      email: "margott1997@gmail.com",
      onlineStatus: "online",
      job: 'Model',
      pfp: "/friend13.jpg",
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
  requests: [],
  friendsBack: [],
  unassociated: []
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
        friend.messages.push(newMessage);
      }
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(getFriendsApi.fulfilled, (state, { payload }) => {
        state.friendsBack = [...payload];
      })
      .addCase(getRequestsApi.fulfilled, (state, { payload }) => {
        state.requests = [...payload];
      })
      .addCase(deleteFriend.fulfilled, (state, { payload }) => {
        state.friendsBack = state.friendsBack.filter(friend => friend.id != payload.friendId);
      })
      .addCase(respondRequest.fulfilled, (state, { payload }) => {
        state.requests = state.requests.filter(request => request.requestId != payload.requestId);
      })
      .addCase(getUnassociatedApi.fulfilled, (state, { payload }) => {
        state.unassociated = [...payload]
      });


  },
  selectors: {
    getFriends: (state) => state.friends,
    getRequests: (state) => state.requests,
    getFriendsBack: (state) => state.friendsBack,
    getUnassociated: (state) => state.unassociated,
  }
});

export const { sendMessage } = friendsSlice.actions
export const { getFriends, getRequests, getFriendsBack, getUnassociated } = friendsSlice.selectors
export default friendsSlice.reducer;