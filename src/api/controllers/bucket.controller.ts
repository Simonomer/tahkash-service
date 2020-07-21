import statusCodes from 'http-status-codes'
import {BucketControllerService} from "../services/bucket.controller.service";
import {FormControllerService} from "../services/form.controller.service";

export async function createBucket(req, res) {
    const service = new BucketControllerService();
    const bucket = req.body;
    const createdBucket = await service.save(bucket);
    await res.status(statusCodes.CREATED).json(createdBucket);
}

export async function modifyBucket(req, res) {
    const service = new BucketControllerService();
    const bucket = req.body;
    const updatedBucket = await service.updateMany([bucket]); // not willing to write update function now
    await res.status(statusCodes.OK).json(updatedBucket)
}

export async function deleteBucket(req, res) {
    const service = new BucketControllerService();
    const formsService = new FormControllerService();
    const bucketId = req.swagger.params.bucketId.value;
    const deletedItem = await service.deleteById(bucketId);
    await formsService.deleteBucketIdFromForms(bucketId);
    await res.status(statusCodes.OK).json(deletedItem);
}

export async function getBuckets(req, res) {
    const service = new BucketControllerService();
    const buckets = await service.findAll();
    await res.status(statusCodes.OK).json(buckets);
}

export async function searchBuckets(req, res) {
    const service = new BucketControllerService();
    const query = req.body;
    const buckets = await service.model.find(query);
    await res.status(statusCodes.OK).json(buckets);
}