// describe('my-test', () => {
//     it('returns true', () => {
//         expect(true).toEqual(true);
//     })
// })

// feature
class FriendsList {
    friends = [];

    addFriend(name) {
        this.friends.push(name);
        this.announceFriendship(name);
    }

    announceFriendship(name) {
        global.console.log(`${name} is now a friend!`)
    }
}

// tests
describe('FriendsList', () => {
    let friendsList;
    beforeEach(() => {
        friendsList = new FriendsList();
    })
    it('initializes friends list', () => {
        const friendsList = new FriendsList();
        expect(friendsList.friends.length).toEqual(0);
    })

    it('adds a friend to the list', () => {
        friendsList.addFriend('Ariel');
        expect(friendsList.friends.length).toEqual(1);
    })

    it('announces friendship', () => {
        friendsList.announceFriendship = jest.fn();
        expect(friendsList.announceFriendship).not.toHaveBeenCalled();
        friendsList.addFriend('Ariel');
        expect(friendsList.announceFriendship).toHaveBeenCalledWith('Ariel');
    })
})