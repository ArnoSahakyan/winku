import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { TInsigths } from "../../components/Post/Post";
import { nanoid } from "nanoid";

export type PostState = {
  id: string;
  name: string;
  pfp: string;
  date: Date;
  insights: TInsigths;
  file: File | null;
  img: string | null;
  text: string | null;
  comments: TComments[] | null;
};

export type TComments = {
  id: string;
  name: string;
  pfp: string;
  date: string; // You might want to use Date type here as well
  message: string;
  replies: TReplies[] | null; // Array of replies
};

export type TReplies = {
  id: string;
  name: string;
  pfp: string;
  date: string; // You might want to use Date type here as well
  message: string;
};

const initialState: PostState[] = [
  {
    id: nanoid(5),
    name: 'Harry Kane',
    pfp: 'https://i.guim.co.uk/img/media/1a7ba1933c25a81dc068b17c007492667f66cc41/0_91_3800_2280/master/3800.jpg?width=465&dpr=1&s=none',
    date: new Date(Date.UTC(2024, 3, 21, 3, 23, 16, 738)),
    insights: {
      id: nanoid(5),
      views: 150500,
      comments: 203,
      likes: 1200000,
      dislikes: 20302
    },
    file: null,
    img: 'https://dailypost.ng/wp-content/uploads/2024/05/Harry-Kane.jpg',
    text: 'Putting in the work every day to make those dreams a reality. 💪⚽️ #HardWorkPaysOff #Dedication',
    comments: [
      {
        id: nanoid(5),
        name: 'Serge Gnabry',
        pfp: 'https://img.fcbayern.com/image/upload/t_cms-1x1-seo-thumbnail/v1712844844/cms/public/images/fcbayern-com/homepage/Saison-23-24/Profis/Gnabry/240309-gnabry-get.jpg',
        date: '1 hour ago',
        message: 'Top class as always, Harry! 🔥 Keep shining on the pitch, mate. Looking forward to battling it out again soon. 💪 #Respect #FootballFamily',
        replies: [
          {
            id: nanoid(5),
            name: 'Toni Kroos',
            pfp: 'https://pbs.twimg.com/profile_images/1144875187508338688/0MtdI4-f_400x400.jpg',
            date: '30 minutes ago',
            message: 'Always a pleasure watching you both do your thing on the pitch! 🔥 Cant wait for the next showdown. Until then, keep making magic happen. 💫 #ClassAct #FootballLegends',
          },
          {
            id: nanoid(5),
            name: 'Manuel Neuer',
            pfp: 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/10/20180602_FIFA_Friendly_Match_Austria_vs._Germany_Manuel_Neuer_850_0723.jpg/640px-20180602_FIFA_Friendly_Match_Austria_vs._Germany_Manuel_Neuer_850_0723.jpg',
            date: '30 minutes ago',
            message: 'Class acts, all around! 🔝⚽️ Cant wait to see the magic you guys create on the pitch. Keep raising the bar, lads! 👊 #FootballExcellence #TeamGoals',
          }
        ]
      },
      {
        id: nanoid(5),
        name: 'Kai Havertz',
        pfp: 'https://pbs.twimg.com/profile_images/1674132394977251337/_ESvph_-_400x400.jpg',
        date: '1 hour ago',
        message: 'Two absolute ballers right here! ⚽️🔥 Keep inspiring, lads. Looking forward to sharing the pitch with you both someday. 💪 #YoungGuns #FutureIsBright',
        replies: [
          {
            id: nanoid(5),
            name: 'Leroy Sane',
            pfp: 'https://pbs.twimg.com/media/F9jCkuKXQAAnALg?format=jpg&name=large',
            date: '25 minutes ago',
            message: 'Two absolute ballers right here! ⚽️🔥 Keep inspiring, lads. Looking forward to sharing the pitch with you both someday. 💪 #YoungGuns #FutureIsBrigh',
          }
        ]
      }
    ]
  },
  {
    id: nanoid(5),
    name: 'Arman Tsarukyan',
    pfp: 'https://dmxg5wxfqgb4u.cloudfront.net/styles/card_advance_small_280x356/s3/2023-12/120223-ARMAN-TSARUKYAN-OCTAGON-INTERVIEW-UFC-AUSTIN.jpg?itok=van1lefI',
    date: new Date(Date.UTC(2024, 3, 20, 3, 12, 16, 738)),
    insights: {
      id: nanoid(5),
      views: 12250500,
      comments: 23203,
      likes: 12100000,
      dislikes: 201302
    },
    file: null,
    img: 'https://armenianweekly.b-cdn.net/wp-content/uploads/2024/04/IMG_1804.jpg',
    text: 'Battle-tested and ready for whatever comes my way. 💥🥋 #WarriorSpirit #NeverBackDown',
    comments: [
      {
        id: nanoid(5),
        name: 'Conor McGregor',
        pfp: 'https://akns-images.eonline.com/eol_images/Entire_Site/2019226/rs_1024x759-190326044524-1024-Conor-McGregor-LT-032619-GettyImages-1047272848.jpg?fit=around%7C1024:759&output-quality=90&crop=1024:759;center,top',
        date: '20 minutes ago',
        message: 'Respect, Arman! Tough fight, but you showed heart in there. Keep grinding, my friend. 👊🔥 #Warrior',
        replies: [
          {
            id: nanoid(5),
            name: 'Khabib Nurmagomedov',
            pfp: 'https://i.pinimg.com/736x/93/2e/37/932e3771110e548d69c5aacd947ddb37.jpg',
            date: '15 minutes ago',
            message: 'No doubt, Conor. Armans relentless. Would be a clash for the ages! 💪👊 #OctagonChaos',
          },
        ]
      }
    ]
  }
]

const onlineStatusSlice = createSlice({
  name: 'posts',
  initialState: initialState as PostState[],
  reducers: {
    setPost: (state, action: PayloadAction<PostState>) => {
      return [action.payload, ...state]
    },
    postComment: (state, { payload }) => {
      const post = state.find(post => post.id === payload.postID)
      if (post) {
        const newComment = {
          id: nanoid(5),
          name: 'Janice Griffith',
          pfp: '/pfp.jpg',
          date: 'right now',
          message: payload.comment,
          replies: []
        }
        post.comments?.push(newComment)
      }
    }

  },
  selectors: {
    getPosts: state => state
  }
});

export const { setPost, postComment } = onlineStatusSlice.actions;
export const { getPosts } = onlineStatusSlice.selectors
export default onlineStatusSlice.reducer;

