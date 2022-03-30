# InstahamJS

Things to implement:

Server Performance
    -compress response

Planned:
    -search accounts
    -like posts
        -post gets clicked
            ->hearts gets red
            ->like counter incremented
            ->postSchema: liked by USERID
            ->UserSchema: liked Posts: POSTID
            -> check whether fetched was liked by user
            -> if true -> dont increment when clicked upon, turn heart red

            
    -delete own account
    -delete posts
    -comment
    -follow account