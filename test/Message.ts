import {
    loadFixture,
} from "@nomicfoundation/hardhat-toolbox/network-helpers";
import { expect } from "chai";
import hre from "hardhat";


describe("Message Test", function () {
    // resueable async method fro deployment
    async function deployMessageFixture() {
        // Contracts are deployed using the first signer/account by default
        const [owner, otherAccount] = await hre.ethers.getSigners();

        const Message = await hre.ethers.getContractFactory("Message");
        const message = await Message.deploy();

        return { message, owner, otherAccount };
    }

    describe("deployment", () => {
        it("Should check if it deployed", async function () {
            const { message, owner } = await loadFixture(deployMessageFixture);
            expect(await message.owner()).to.equal(owner);
        })

        it("should  be able to set message as the owner", async function () {
            const { message, owner } = await loadFixture(deployMessageFixture);
            const msg = "Hello world";
            await message.connect(owner).setMessage(msg)

            expect(await message.getMessage()).to.equal(msg);
        });
        it("should not be able to set message if not the owner", async function () {
            const { message, otherAccount } = await loadFixture(deployMessageFixture);
            const msg = "Hello world";
            await expect(message.connect(otherAccount).setMessage(msg)).to.be.revertedWith("you aren't the owner");
        });

        it("should be able to transfer ownership", async function () {
            const {message, owner, otherAccount} = await loadFixture(deployMessageFixture)
            
            await message.connect(owner).transferOwnership(otherAccount)

            expect(await message.owner()).to.be.equal(otherAccount)

        })

        it("should not be able to do transfer if not the owner", async function () {
            const {message, otherAccount} = await loadFixture(deployMessageFixture)
            const msg = "if am not the owner i should not be able to do transfer";
            await expect(message.connect(otherAccount).transferOwnership(otherAccount)).to.be.revertedWith("you aren't the owner");
        } )
    })
})